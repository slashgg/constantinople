// tslint:disable:max-classes-per-file

import { User } from '@core/models/user';
import { Action } from '@ngrx/store';

export enum UserActions {
  SET_USER = '[User] Set',
  REMOVE_USER = '[User] Remove',
}
export class SetUser implements Action {
  readonly type = UserActions.SET_USER;

  constructor(public user: User) {}
}

export class RemoveUser implements Action {
  readonly type = UserActions.REMOVE_USER;
}

export type Actions = SetUser | RemoveUser;
