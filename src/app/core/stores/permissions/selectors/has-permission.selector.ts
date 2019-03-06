import { AppState } from '@core/stores/app.state';
import { createSelector } from '@ngrx/store';
import { generateMasterPermission } from '@utils/utils/permission';

const selectPermissions = (appState: AppState) => appState.permission.permissions;

export const hasPermissionSelector = createSelector(
  selectPermissions,
  (permissions: string[], props: { permission: string }) => {
    let hasPermission = permissions.some(p => p === props.permission);
    if (!hasPermission) {
      const masterPermission = generateMasterPermission(props.permission);
      hasPermission = permissions.some(p => p === masterPermission);
    }

    return hasPermission;
  }
);
