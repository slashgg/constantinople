import { Injectable } from '@angular/core';
import { PermissionService } from '@core/services/permission/permission.service';
import { PermissionsActions, PermissionsReceived } from '@core/stores/permissions/permission.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class PermissionEffects {
  constructor(private actions$: Actions, private permissionService: PermissionService) {}

  @Effect()
  loadPermissions$ = this.actions$.pipe(
    ofType(PermissionsActions.GET_PERMISSIONS),
    mergeMap(() =>
      this.permissionService
        .getPermissions()
        .pipe(map(permissions => new PermissionsReceived(permissions), catchError(() => EMPTY)))
    )
  );
}
