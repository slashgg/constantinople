import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CompetitionRoutingModule {}
