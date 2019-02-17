import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user';
import { AppState } from '@core/stores/app.state';
import { UserState } from '@core/stores/user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  private user$: Observable<UserState>;
  private user?: User;

  constructor(private userService: UserService, private store: Store<AppState>) {
    this.user$ = this.store.select('user');
    this.user$.subscribe(userStore => {
      this.user = userStore.user;
    });
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.user) {
      this.userService.redirectToLogin();
      return false;
    }
    return true;
  }
}
