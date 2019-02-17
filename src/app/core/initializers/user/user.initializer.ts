import { Injectable } from '@angular/core';
import { UserService } from '@core/services/user';
import { AppState } from '@core/stores/app.state';
import { State, Store } from '@ngrx/store';

@Injectable()
export class UserInitServce {
  constructor(private userService: UserService, private store: Store<AppState>) {
    this.userService.initialize();
  }

  load() {
    return new Promise((resolve, reject) => {
      this.store.select('user').subscribe(userStore => {
        if (userStore.initialized) {
          resolve();
        }
      });
    });
  }
}

export function userInitializer(userInitService: UserInitServce) {
  return () => userInitService.load();
}
