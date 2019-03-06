import { Component, OnInit } from '@angular/core';
import { AppState } from '@core/stores/app.state';
import { InitCompetitions } from '@core/stores/competition';
import { selectinitialized } from '@core/stores/meta';
import { GetPermissions } from '@core/stores/permissions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'gg-root',
  templateUrl: './root.component.html',
})
export class RootComponent implements OnInit {
  public initialized: boolean;
  public constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectinitialized).subscribe(initialized => {
      this.initialized = initialized;
    });

    this.store.dispatch(new GetPermissions());
    this.store.dispatch(new InitCompetitions());
  }
}
