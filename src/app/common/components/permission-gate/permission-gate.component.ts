import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '@core/stores/app.state';
import { hasPermissionSelector } from '@core/stores/permissions/selectors';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  template: '<ng-content *ngIf="hasPermission"></ng-content>',
  selector: 'gg-permission-gate',
})
export class PermissionGateComponent implements OnInit, OnDestroy {
  @Input() permission: string;
  public hasPermission = false;
  private permissionSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.permissionSubscription = this.store
      .pipe(select(hasPermissionSelector, { permission: this.permission }))
      .subscribe(hasPermission => {
        this.hasPermission = hasPermission;
      });
  }

  ngOnDestroy() {
    if (this.permissionSubscription) {
      this.permissionSubscription.unsubscribe();
    }
  }
}
