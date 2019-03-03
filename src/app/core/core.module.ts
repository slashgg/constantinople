import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CompetitionSelectorComponent } from '@core/components/side-nav/competition-selector';
import { SideNavComponent } from '@core/components/side-nav/side-nav';
import { TopbarComponent } from '@core/components/topbar';
import { CoreRoutingModule } from '@core/core-routing.module';
import { userInitializer, UserInitServce } from '@core/initializers/user';
import { AuthHeaderInceptor } from '@core/interceptor/auth.interceptor';
import { BaseURLInterceptor } from '@core/interceptor/baseurl.interceptor';
import { LoginCallbackComponent } from '@core/pages/login-callback';
import { SilentCallbackComponent } from '@core/pages/silent-callback';
import { UnauthorizedComponent } from '@core/pages/unauthorized';
import { StorageService } from '@core/services/storage';
import { LayoutModule } from 'layout';

const IMPORTS = [CommonModule, CoreRoutingModule, LayoutModule];

@NgModule({
  declarations: [
    LoginCallbackComponent,
    UnauthorizedComponent,
    SilentCallbackComponent,
    TopbarComponent,
    SideNavComponent,
    CompetitionSelectorComponent,
  ],
  providers: [
    UserInitServce,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: userInitializer,
      deps: [UserInitServce],
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthHeaderInceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: BaseURLInterceptor,
    },
    StorageService,
  ],
  imports: IMPORTS,
  exports: [TopbarComponent, SideNavComponent],
})
export class CoreModule {}
