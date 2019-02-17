import { Injectable } from '@angular/core';
import { LoggerService } from '@core/services/logger';

@Injectable({
  providedIn: 'root',
})
export class TempStorageService {
  private cache: Record<string, string> = {};
  private storage: Storage = sessionStorage;
  constructor(private logger: LoggerService) {}

  public get<T>(key: string, defaultValue: T): T {
    let serializedValue: string | null = null;

    try {
      serializedValue = localStorage.getItem(key);
    } catch (err) {
      this.logger.warn('Failed to load stored value.', err, { key });

      // If we have a cached value, use it.
      serializedValue = this.cache[key] || null;
    }

    // If there's no result, or we get the literal string `undefined`, return the default value.
    if (serializedValue === null || serializedValue === 'undefined') {
      return defaultValue;
    }

    try {
      return JSON.parse(serializedValue) as T;
    } catch (err) {
      this.logger.warn('Failed to deserialize stored value, removing from storage.', err, {
        key,
        value: serializedValue,
      });
      this.remove(key);
      return defaultValue;
    }
  }

  /**
   * Gets a JSON value from storage and deserializes it.
   * Returns `null` if it doesn't exist.
   *
   * Storage errors are logged, but will not throw.
   */
  public getOptional<T>(key: string): T | null {
    return this.get(key, null);
  }

  /**
   * JSON Serializes a value and saves it.
   * Throws if the value can't be serialized.
   *
   * Storage errors are logged, but will not throw.
   */
  public set(key: string, value: {}) {
    let serializedValue: string;

    try {
      serializedValue = JSON.stringify(value);
    } catch (err) {
      // Log a warning and rethrow. It is a developer error to pass a value that can't be serialized, so we don't want to gracefully fail to serialize.
      this.logger.warn('Failed to serialize value.', err, { key, value });
      throw err;
    }

    // Cache the value. This allows for identical behavior when storage fails.
    this.cache[key] = serializedValue;

    try {
      this.storage.setItem(key, serializedValue);
    } catch (err) {
      // But we *do* want to silently fail if the underlying storage fails (typically because of quota in Safari incognito mode).
      this.logger.warn('Failed to save value.', err, { key, value, serializedValue });
    }
  }

  /**
   * Removes a value from storage.
   *
   * Storage errors are logged, but will not throw.
   */
  public remove(key: string) {
    delete this.cache[key];

    try {
      this.storage.removeItem(key);
    } catch (err) {
      this.logger.warn('Failed to remove key from storage.', err, { key });
    }
  }

  /**
   * Clears all data from storage.
   *
   * Storage errors are logged, but will not throw.
   */
  public clear() {
    this.cache = {};

    try {
      this.storage.clear();
    } catch (err) {
      this.logger.warn('Failed to clear storage.', err);
    }
  }
}
