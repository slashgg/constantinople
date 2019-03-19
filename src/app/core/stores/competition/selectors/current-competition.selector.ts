import { Competition } from '@core/models/competition';
import { AppState } from '@core/stores/app.state';
import { createSelector } from '@ngrx/store';

const selectCurrentCompetition = (appState: AppState) => appState.competition.selectedCompetition;

export const currentCompetitionIdSelector = createSelector(
  selectCurrentCompetition,
  (competition: Competition) => {
    if (!competition) {
      return null;
    }
    return competition.id;
  }
);
