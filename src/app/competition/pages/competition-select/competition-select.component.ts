import { Component, OnDestroy, OnInit } from '@angular/core';
import { Competition } from '@core/models/competition';
import { AppState } from '@core/stores/app.state';
import { CompetitionSelected } from '@core/stores/competition';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gg-competition-select-page',
  templateUrl: './competition-select.component.html',
})
export class CompetitionSelectPageComponent implements OnInit, OnDestroy {
  private competitionsSub: Subscription;
  public competitions: Competition[] = [];
  public selectedCompetition?: Competition;

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.competitionsSub = this.store.select('competition').subscribe(competitionState => {
      this.competitions = competitionState.competitions;
      this.selectedCompetition = competitionState.selectedCompetition;
    });
  }

  ngOnDestroy() {
    if (this.competitionsSub) {
      this.competitionsSub.unsubscribe();
    }
  }

  onSelect(competition: Competition) {
    this.store.dispatch(new CompetitionSelected(competition));
  }
}
