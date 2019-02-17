import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';
import { RootComponent } from '@root/components/root';
import { AppComponent } from './app.component';
import { RootRoutingModule } from './root-routing.module';

@NgModule({
  declarations: [AppComponent, RootComponent],
  imports: [BrowserModule, RootRoutingModule, HttpClientModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class RootModule {}
