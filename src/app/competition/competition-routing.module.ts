import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionSelectPageComponent } from 'competition/pages/competition-select';

const routes: Routes = [
  {
    path: '',
    component: CompetitionSelectPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CompetitionRoutingModule {}
