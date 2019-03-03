import { competitionReducer, CompetitionState } from '@core/stores/competition';
import { permissionsReducer } from '@core/stores/permissions';
import { userReducer, UserState } from '@core/stores/user';

export interface AppState {
  user: UserState;
  competition: CompetitionState;
}

export const constantinopleStore = {
  user: userReducer,
  competition: competitionReducer,
  permission: permissionsReducer,
};
