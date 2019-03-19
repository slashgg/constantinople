import { Component, OnDestroy, OnInit } from '@angular/core';
import { TournamentService } from '@core/services/tournament';
import { AppState } from '@core/stores/app.state';
import { currentCompetitionIdSelector } from '@core/stores/competition/selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { TournamentDetail } from 'tournament/models/tournament.model';

@Component({
  selector: 'gg-tournament-list-page',
  templateUrl: './tournament-list.component.html',
})
export class TournamentListPageComponent implements OnDestroy, OnInit {
  private storeSubscription: Subscription;
  public tournaments: TournamentDetail[];

  constructor(private store: Store<AppState>, private tournamentService: TournamentService) {}

  ngOnInit() {
    this.storeSubscription = this.store
      .select(currentCompetitionIdSelector)
      .pipe(
        filter(competitionId => competitionId !== null),
        mergeMap(competitionId => this.tournamentService.getTournamentListForCompetition(competitionId))
      )
      .subscribe(tournaments => {
        this.tournaments = tournaments;
      });
  }

  ngOnDestroy() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
}
