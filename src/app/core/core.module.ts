import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CoreRoutingModule } from '@core/core-routing.module';
import { userInitializer, UserInitServce } from '@core/initializers/user';
import { LoginCallbackComponent } from '@core/pages/login-callback';
import { SilentCallbackComponent } from '@core/pages/silent-callback';
import { UnauthorizedComponent } from '@core/pages/unauthorized';
import { constantinopleStore } from '@core/stores/app.state';
import { config } from '@env';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ImportState } from '@ngrx/store-devtools/src/actions';
import { Environment } from '@utils/models/environment';
import { LayoutModule } from 'layout';

const IMPORTS = [CommonModule, CoreRoutingModule, StoreModule.forRoot(constantinopleStore), LayoutModule];

if (config.env === Environment.Production) {
  IMPORTS.push(StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: config.env === Environment.Production }));
}

@NgModule({
  declarations: [LoginCallbackComponent, UnauthorizedComponent, SilentCallbackComponent],
  providers: [
    UserInitServce,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: userInitializer,
      deps: [UserInitServce],
    },
  ],
  imports: IMPORTS,
})
export class CoreModule {}
