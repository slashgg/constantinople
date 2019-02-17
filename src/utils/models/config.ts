import { Authentication } from './authentication';
import { Environment } from './environment';

export interface ConfigOptions {
  env: Environment;
  auth: Authentication;
  authDomain: string;
  localDomain: string;
}

export class Config {
  public env: Environment;
  public auth: Authentication;

  public authDomain: string;
  public localDomain: string;

  constructor(opts: ConfigOptions) {
    this.localDomain = opts.localDomain;
    this.env = opts.env;
    this.auth = {
      authority: opts.auth.authority,
      redirectUri: `${this.localDomain}${opts.auth.redirectUri}`,
      silentRedirectUri: `${this.localDomain}${opts.auth.silentRedirectUri}`,
      logoutRedirectUri: `${this.localDomain}${opts.auth.logoutRedirectUri}`,
      client_id: opts.auth.client_id,
      response_type: opts.auth.response_type,
      scope: opts.auth.scope,
    };

    this.authDomain = opts.authDomain;
  }
}
