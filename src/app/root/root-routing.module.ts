import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@core/guards/login';
import { RootComponent } from '@root/components/root/root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'competitions',
        loadChildren: './../competition/competition.module#CompetitionModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule {}
