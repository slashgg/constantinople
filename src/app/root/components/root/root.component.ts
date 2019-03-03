import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/stores/app.state';
import { InitCompetitions } from '@core/stores/competition';
import { GetPermissions } from '@core/stores/permissions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'gg-root',
  templateUrl: './root.component.html',
})
export class RootComponent implements OnInit {
  public constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetPermissions());
    this.store.dispatch(new InitCompetitions());
  }
}
