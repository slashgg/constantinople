import { Injectable } from '@angular/core';
import { config } from '@env';
import * as Sentry from '@sentry/browser';
import { Environment } from '@utils/models/environment';
import { EventEmitter } from 'eventemitter3';

declare const console: Console & {
  [i: string]: Function;
};

export enum LogLevel {
  Debug = 1,
  Info,
  Warn,
  Error,
  Fatal,
}
export type LogErrorType = 'uncaught' | 'caught' | 'fatal';

export interface LogError {
  message: string;
  name: string;
  stack: string | null;
  type: LogErrorType;
}

type LogEntryLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogEntry {
  // tslint:disable-next-line:no-any
  args?: any[];
  category?: string;
  componentName?: string;
  errors?: LogError[];
  level: LogEntryLevel;
  message: string;
  time: number;
}

export type MessageListener = (entries: LogEntry) => void;

const minConsoleLogLevel = config.env === Environment.Production ? LogLevel.Error : LogLevel.Debug;

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private buffer?: LogEntry[] = [];
  private environment?: Environment = config.env;
  private eventEmitter = new EventEmitter();
  private firstMessageTime?: number;
  private maxBufferSize = 1000;
  private messagesTruncated?: number;
  private minConsoleLogLevel?: LogLevel = minConsoleLogLevel;
  private truncationEvents?: number;
  private windowErrorListenerAdded?: boolean;

  constructor() {
    this.addWindowErrorListener();
  }

  public addWindowErrorListener() {
    if (this.windowErrorListenerAdded) {
      this.warn('Attempted to add window error listener multiple times.');
      return;
    }

    this.windowErrorListenerAdded = true;
    window.addEventListener('error', this.onWindowError);

    this.debug('Window error listener added.');
  }

  /**
   * Logs a debug-level message to the browser console.
   *
   * Debug messages are not logged in any way in production.
   */
  // tslint:disable-next-line:no-any
  public debug(message: string, ...args: any[]) {
    this.write(LogLevel.Debug, message, args);
  }

  /**
   * Logs an info-level message.
   *
   * Info messages are not logged to the browser console in production.
   */
  // tslint:disable-next-line:no-any
  public info(message: string, ...args: any[]) {
    this.write(LogLevel.Info, message, args);
  }

  /**
   * Logs a warning.
   *
   * Warnings are not logged to the browser console in production.
   */
  // tslint:disable-next-line:no-any
  public warn(message: string, ...args: any[]) {
    this.write(LogLevel.Warn, message, args);
  }

  /**
   * Logs an error.
   *
   * Errors are logged to the browser console in production.
   */
  // tslint:disable-next-line:no-any
  public error(error: Error, message: string, ...args: any[]) {
    this.write(LogLevel.Error, message, args, error, 'caught');
  }

  /**
   * Logs a fatal error. Fatal errors are ones that cannot be recovered in any way.
   *
   * Fatal errors are logged to the console in production.
   */
  // tslint:disable-next-line:no-any
  public fatal(error: Error, message: string, ...args: any[]) {
    Sentry.withScope(scope => {
      scope.setLevel(Sentry.Severity.Fatal);
      scope.setExtra('args', args);
      scope.setExtra('message', message);
      Sentry.captureException(error);
    });
    this.write(LogLevel.Fatal, message, args, error, 'fatal');
  }

  /**
   * Returns and flushes the log buffer. Will throw an error on child loggers.
   */
  public flush() {
    const buffer = this.buffer;
    this.buffer = [];

    if (this.messagesTruncated && buffer) {
      buffer.unshift({
        time: buffer[0].time - 1,
        level: LogLevel[LogLevel.Info].toLowerCase() as LogEntryLevel,
        message: 'Log truncated.',
        args: [
          {
            firstMessageTime: this.firstMessageTime,
            messagesTruncated: this.messagesTruncated,
            truncationEvents: this.truncationEvents,
          },
        ],
      });
    }

    return buffer;
  }

  public addMessageListener = (listener: MessageListener) => {
    this.eventEmitter.addListener('message', listener);
  };

  public removeMessageListener = (listener: MessageListener) => {
    this.eventEmitter.removeListener('message', listener);
  };

  private onWindowError = (e: ErrorEvent) => {
    if (e.error) {
      e.preventDefault();
      this.write(LogLevel.Error, 'Uncaught error.', undefined, e.error, 'uncaught');
    } else {
      this.write(
        LogLevel.Warn,
        // tslint:disable-next-line:max-line-length
        'Uncaught error, but the error object is null. This is usually caused by a browser permission issue. Please check the browser console.',
        [{ event: e }],
        new Error('Uncaught error, but the error object is null.'),
        'uncaught'
      );
    }
  };

  /**
   * Writes a message to the log buffer and to the console, if applicable. Automatically serializes arguments, and
   * extracts errors.
   *
   * @param ignoreBufferError Used to prevent infinite recursion in case of serialization errors in `writeToBuffer`.
   */
  // tslint:disable-next-line:no-any
  private write(
    level: LogLevel,
    message: string,
    args: any[] = [],
    error?: Error,
    errorType?: LogErrorType,
    category?: string,
    ignoreBufferError = false,
    componentName?: string
  ) {
    if (this.buffer && this.buffer.length === this.maxBufferSize) {
      if (!this.firstMessageTime) {
        this.firstMessageTime = this.buffer[0].time;
      }

      this.truncationEvents = (this.truncationEvents || 0) + 1;
      this.messagesTruncated =
        (this.messagesTruncated || 0) + this.buffer.splice(0, Math.ceil(this.maxBufferSize / 10)).length;
    }

    if (this.minConsoleLogLevel && level >= this.minConsoleLogLevel) {
      this.writeToConsole(level, category, message, args, error, componentName);
    }

    let entry;

    // Don't write debug messages to the buffer.
    if (level !== LogLevel.Debug) {
      entry = this.writeToBuffer(level, category, message, args, error, errorType, ignoreBufferError, componentName);
    }
  }

  /**
   * Writes a log message to the buffer. Automatically serializes arguments, and extracts errors.
   *
   * @param ignoreBufferError Used to prevent infinite recursion in case of serialization errors.
   */
  // tslint:disable-next-line:no-any
  private writeToBuffer(
    level: LogLevel,
    category: string | undefined,
    message: string,
    args?: any[],
    error?: Error,
    errorType?: LogErrorType,
    ignoreBufferError = false,
    componentName?: string
  ) {
    const serializationErrors: Array<{
      message: string;
      argIndex: number;
      err: Error;
    }> = [];

    const entry: LogEntry = {
      time: Date.now(),
      level: LogLevel[level].toLowerCase() as LogEntryLevel,
      message,
    };

    if (args && args.length > 0) {
      entry.args = args.map((arg, i) => {
        if (arg instanceof Error) {
          return {
            name: arg.name,
            message: arg.message,
            stack: arg.stack || null,
          };
        } else if (typeof arg === 'object') {
          // Serialize objects to avoid future mutations, and catch serialization errors.
          try {
            return JSON.parse(JSON.stringify(arg));
          } catch (err) {
            serializationErrors.push({ message, argIndex: i, err });
            return '<unserializable>';
          }
        } else if (typeof arg === 'function') {
          return arg.name ? `<function ${arg.name}>` : '<anonymous function>';
        }

        return arg;
      });
    }

    if (category) {
      entry.category = category;
    }

    if (componentName) {
      entry.componentName = componentName;
    }

    if (error) {
      entry.errors = [
        {
          name: error.name,
          message: error.message,
          stack: error.stack || null,
          type: errorType || 'caught',
        },
      ];
    }

    if (this.buffer) {
      this.buffer.push(entry);
    }

    // Report any serialization errors.
    if (!ignoreBufferError) {
      for (const err of serializationErrors) {
        if (this.environment === Environment.Production) {
          this.write(
            LogLevel.Warn,
            'Failed to serialize argument for log message.',
            [{ message: err.message, argIndex: err.argIndex, err: err.err }],
            undefined,
            undefined,
            undefined,
            true
          );
        } else {
          this.write(
            LogLevel.Error,
            'Failed to serialize argument for log message.',
            [{ message: err.message, argIndex: err.argIndex }],
            err.err,
            'caught',
            category,
            true
          );
        }
      }
    }

    this.eventEmitter.emit('message', entry);
    return entry;
  }

  /**
   * Writes a log message to the console.
   */
  private writeToConsole(
    level: LogLevel,
    category: string | undefined,
    message: string,
    args: Array<{}>,
    err?: Error,
    componentName?: string
  ) {
    const time = new Date().toLocaleTimeString();
    category = category ? `[${category}] ` : '';
    componentName = componentName ? `[${componentName}] ` : '';
    message = `${time} [${LogLevel[level].toUpperCase()}] ${category}${componentName}${message}`;

    if (level === LogLevel.Fatal) {
      level = LogLevel.Error;
    }

    // tslint:disable-next-line:no-console
    const log = (console[LogLevel[level].toLowerCase()] || console.log).bind(console);
    if (err) {
      log(message, err, ...args);
    } else {
      log(message, ...args);
    }
  }
}
