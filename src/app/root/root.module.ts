import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { RootComponent } from '@root/components/root';
import { LayoutModule } from 'layout';
import { AppComponent } from './app.component';
import { RootRoutingModule } from './root-routing.module';

@NgModule({
  declarations: [AppComponent, RootComponent],
  imports: [
    BrowserModule,
    RootRoutingModule,
    CommonModule,
    HttpClientModule,
    CoreModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class RootModule {}
