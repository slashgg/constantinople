import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentListPageComponent } from 'tournament/pages/pages/tournament-list';

const routes: Routes = [
  {
    path: '',
    component: TournamentListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TournamentRoutingModule {}
