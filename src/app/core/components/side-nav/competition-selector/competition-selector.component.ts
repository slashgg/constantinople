import { Component, OnDestroy, OnInit } from '@angular/core';
import { Competition } from '@core/models/competition';
import { AppState } from '@core/stores/app.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gg-competition-selector',
  templateUrl: './competition-selector.component.html',
})
export class CompetitionSelectorComponent implements OnInit, OnDestroy {
  private competitionSubscriber?: Subscription;
  public competition?: Competition;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.competitionSubscriber = this.store.select('competition').subscribe(competitionStore => {
      this.competition = competitionStore.selectedCompetition;
    });
  }

  ngOnDestroy() {
    if (this.competitionSubscriber) {
      this.competitionSubscriber.unsubscribe();
    }
  }
}
