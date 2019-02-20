import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user';
import { AppState } from '@core/stores/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'gg-login-callback',
  template: `
    <main class="w-full h-full flex justify-center items-center"><h1>Loading..</h1></main>
  `,
})
export class LoginCallbackComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  constructor(private userService: UserService, private router: Router, private store: Store<AppState>) {}

  async ngOnInit() {
    this.userSubscription = this.store
      .select('user')
      .pipe(debounceTime(200))
      .subscribe(userState => {
        if (userState.initialized && userState.user) {
          this.router.navigateByUrl('/');
        } else if (userState.initialized && !userState.user) {
          this.router.navigateByUrl('/unauthorized');
        }
      });

    await this.userService.handleSignin();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
