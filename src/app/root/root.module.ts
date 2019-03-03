import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { constantinopleStore } from '@core/stores/app.state';
import { CompetitionEffects } from '@core/stores/competition';
import { PermissionEffects } from '@core/stores/permissions';
import { config } from '@env';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RootComponent } from '@root/components/root';
import { Environment } from '@utils/models/environment';
import { CompetitionModule } from 'competition/competition.module';
import { LayoutModule } from 'layout';
import { AppComponent } from './app.component';
import { RootRoutingModule } from './root-routing.module';

const IMPORTS: any = [
  BrowserModule,
  RootRoutingModule,
  CommonModule,
  HttpClientModule,
  BrowserAnimationsModule,
  LayoutModule,
  CoreModule,
  StoreModule.forRoot(constantinopleStore),
  EffectsModule.forRoot([PermissionEffects, CompetitionEffects]),
];

if (config.env === Environment.Development) {
  IMPORTS.push(StoreDevtoolsModule.instrument({ maxAge: 25 }));
}

@NgModule({
  declarations: [AppComponent, RootComponent],
  imports: IMPORTS,
  providers: [],
  bootstrap: [AppComponent],
})
export class RootModule {}
