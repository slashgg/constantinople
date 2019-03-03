import { Actions, PermissionsState } from '@core/stores/permissions';
import { PermissionsActions } from '@core/stores/permissions/permission.actions';

export const initialState: PermissionsState = {
  permissions: [],
};

export function permissionsReducer(state: PermissionsState = initialState, action: Actions): PermissionsState {
  switch (action.type) {
    case PermissionsActions.RECEIVED_PERMISSIONS:
      return {
        permissions: action.permissions,
      };
    default:
      return state;
  }
}
