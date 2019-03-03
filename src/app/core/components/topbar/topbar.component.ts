import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user';
import { AppState } from '@core/stores/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gg-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  public user: User;

  private userSubscriber?: Subscription;

  constructor(private userService: UserService, private store: Store<AppState>) {}

  ngOnInit() {
    this.userSubscriber = this.store.select('user').subscribe(userStore => {
      this.user = userStore.user;
    });
  }

  ngOnDestroy() {
    if (this.userSubscriber) {
      this.userSubscriber.unsubscribe();
    }
  }

  logout() {
    this.userService.logout();
  }
}
