import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionOverviewComponent } from 'competition/pages/competition-overview/competition-overview.component';
import { CompetitionSelectPageComponent } from 'competition/pages/competition-select';
import { CreateCompetitionPageComponent } from 'competition/pages/create-competition';

const routes: Routes = [
  {
    path: '',
    component: CompetitionSelectPageComponent,
  },
  {
    path: 'new',
    component: CreateCompetitionPageComponent,
  },
  {
    path: ':competitionId',
    component: CompetitionOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CompetitionRoutingModule {}
