import { Actions, CompetitionActions } from '@core/stores/competition/competition.actions';
import { CompetitionState } from '@core/stores/competition/state';

export const initialState: CompetitionState = {
  competitions: [],
  selectedCompetition: undefined,
  initialized: false,
};

export function competitionReducer(state: CompetitionState = initialState, actions: Actions): CompetitionState {
  switch (actions.type) {
    case CompetitionActions.COMPETITIONS_INIT_FINISHED:
      return {
        ...state,
        initialized: true,
      };
    case CompetitionActions.COMPETITIONS_LOADED:
      return {
        ...state,
        competitions: actions.competitions,
      };
    case CompetitionActions.COMPETITION_SET:
      return {
        ...state,
        selectedCompetition: actions.competition,
      };
    default:
      return state;
  }
}
