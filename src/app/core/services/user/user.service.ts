import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models/user';
import { AppState } from '@core/stores/app.state';
import { RemoveUser, SetUser } from '@core/stores/user';
import { config } from '@env';
import { Store } from '@ngrx/store';
import { User as OIDCUser, UserManager, WebStorageStateStore } from 'oidc-client';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public userManager: UserManager;

  constructor(private store: Store<AppState>) {
    this.userManager = new UserManager({
      authority: config.auth.authority,
      redirect_uri: config.auth.redirectUri,
      silent_redirect_uri: config.auth.silentRedirectUri,
      automaticSilentRenew: false,
      client_id: config.auth.client_id,
      response_type: config.auth.response_type,
      scope: config.auth.scope,
      userStore: new WebStorageStateStore({ store: localStorage }),
      loadUserInfo: true,
    });

    this.userManager.events.addUserLoaded(this.handleUserLoaded);
    this.userManager.events.addUserUnloaded(this.handleUserUnloaded);
  }

  public async initialize() {
    try {
      const user = await this.userManager.getUser();
      if (user) {
        this.handleUserLoaded(user);
      } else {
        this.handleUserUnloaded();
      }
    } catch (e) {
      this.handleUserUnloaded();
    }
  }

  public redirectToLogin(redirectTo?: string) {
    if (!redirectTo) {
      redirectTo = '';
    }
    this.userManager.clearStaleState();
    this.userManager.signinRedirect({ returnTo: redirectTo });
  }

  public silentLogin() {
    this.userManager.signinSilent();
  }

  public async handleSilentSignin() {
    await this.userManager.signinSilentCallback();
  }

  public async handleSignin() {
    const authUser = await this.userManager.signinRedirectCallback();
  }

  private handleUserLoaded = (authUser: OIDCUser) => {
    const user = new User({
      username: authUser.profile.name,
      roles: authUser.profile.role,
      email: authUser.profile.email,
    });

    const staff = user.isStaff();
    if (!staff) {
      return;
    }

    this.store.dispatch(new SetUser(user));
  };

  private handleUserUnloaded = (silentSignin?: boolean) => {
    this.store.dispatch(new RemoveUser());
  };
}
