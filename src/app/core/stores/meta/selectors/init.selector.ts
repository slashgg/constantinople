import { AppState } from '@core/stores/app.state';
import { createSelector } from '@ngrx/store';

export const selectUserInitialzed = (state: AppState) => state.user.initialized;
export const selectCompetitionsInitialized = (state: AppState) => state.competition.initialized;

export const selectinitialized = createSelector(
  selectUserInitialzed,
  selectCompetitionsInitialized,
  (userInitialzed: boolean, competitionsInitialized: boolean) => {
    return userInitialzed && competitionsInitialized;
  }
);
