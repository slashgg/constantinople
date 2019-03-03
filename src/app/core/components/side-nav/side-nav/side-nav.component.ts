import { Component, OnDestroy, OnInit } from '@angular/core';
import { Competition } from '@core/models/competition';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user';
import { AppState } from '@core/stores/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gg-side-nav',
  templateUrl: './side-nav.component.html',
})
export class SideNavComponent implements OnInit, OnDestroy {
  public user: User;
  public competition: Competition;
  private userSubscription: Subscription;
  private competitionSubscription: Subscription;

  constructor(private store: Store<AppState>, private userService: UserService) {}

  ngOnInit() {
    this.userSubscription = this.store.select('user').subscribe(userStore => {
      this.user = userStore.user;
    });

    this.competitionSubscription = this.store.select('competition').subscribe(competitionState => {
      this.competition = competitionState.selectedCompetition;
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.competitionSubscription) {
      this.competitionSubscription.unsubscribe();
    }
  }

  public logout() {
    this.userService.logout();
  }
}
