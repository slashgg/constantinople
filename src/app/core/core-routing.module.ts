import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginCallbackComponent } from '@core/pages/login-callback';
import { UnauthorizedComponent } from '@core/pages/unauthorized';

const routes: Routes = [
  {
    path: 'oauth/login-callback',
    component: LoginCallbackComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
