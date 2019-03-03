// tslint:disable:max-classes-per-file

import { Action } from '@ngrx/store';

export enum PermissionsActions {
  GET_PERMISSIONS = '[Permissions] Get',
  RECEIVED_PERMISSIONS = '[Permissions] Received',
}

export class GetPermissions implements Action {
  readonly type = PermissionsActions.GET_PERMISSIONS;
}

export class PermissionsReceived implements Action {
  readonly type = PermissionsActions.RECEIVED_PERMISSIONS;

  constructor(public permissions: string[]) {}
}

export type Actions = GetPermissions | PermissionsReceived;
