import { Actions } from '@core/stores/user';
import { UserState } from '@core/stores/user/state';
import { UserActions } from '@core/stores/user/user.actions';

export const initialState: UserState = {
  user: undefined,
  initialized: false,
};

export function userReducer(state: UserState = initialState, action: Actions): UserState {
  switch (action.type) {
    case UserActions.SET_USER:
      return {
        ...state,
        initialized: true,
        user: action.user,
      };
      break;
    case UserActions.REMOVE_USER:
      return {
        ...state,
        initialized: true,
        user: undefined,
      };
      break;
    default:
      return state;
      break;
  }
}
