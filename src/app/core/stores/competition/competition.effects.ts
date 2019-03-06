import { Injectable } from '@angular/core';
import { Competition } from '@core/models/competition';
import { CompetitionService } from '@core/services/competition';
import { StorageService } from '@core/services/storage';
import {
  Actions as CompetitionDispatchActions,
  CompetitionActions,
  CompetitionSelected,
  CompetitionsInitiFinished,
  CompetitionsLoaded,
} from '@core/stores/competition/competition.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CompetitionEffects {
  constructor(
    private actions$: Actions,
    private competitionService: CompetitionService,
    private storage: StorageService
  ) {}

  @Effect()
  loadAvailableCompetitions$ = this.actions$.pipe(
    ofType(CompetitionActions.COMPETITIONS_INIT),
    mergeMap(() =>
      this.competitionService.getAvailableCompetitions().pipe(
        switchMap(competitions => {
          const effects: CompetitionDispatchActions[] = [new CompetitionsLoaded(competitions)];
          const defaultCompData = this.storage.get('selectedCompetition', undefined);
          if (defaultCompData) {
            const competition = new Competition(defaultCompData);
            if (competitions.some(c => c.id === competition.id)) {
              effects.push(new CompetitionSelected(competition));
            }
          }
          effects.push(new CompetitionsInitiFinished());
          return effects;
        }),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  saveSelectionToStore = this.actions$.pipe(
    ofType(CompetitionActions.COMPETITION_SET),
    map<CompetitionSelected, Competition>(action => action.competition),
    tap(competition => {
      this.storage.set('selectedCompetition', competition);
    }),
    mergeMap(() => EMPTY)
  );
}
