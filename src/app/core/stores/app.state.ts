import { UserState } from '@core/stores/user/state';
import { userReducer } from '@core/stores/user/user.store';

export interface AppState {
  user: UserState;
}

export const constantinopleStore = {
  user: userReducer,
};
