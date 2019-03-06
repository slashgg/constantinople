import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SlashCommonModule } from 'common/common.module';
import { CompetitionRoutingModule } from 'competition/competition-routing.module';
import { CompetitionFormComponent } from 'competition/components/competition-form';
import { CompetitionItemComponent } from 'competition/components/competition-item';
import { CompetitionSelectPageComponent } from 'competition/pages/competition-select';
import { CreateCompetitionPageComponent } from 'competition/pages/create-competition';
import { LayoutModule } from 'layout';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LayoutModule, SlashCommonModule, CompetitionRoutingModule],
  declarations: [
    CompetitionSelectPageComponent,
    CompetitionItemComponent,
    CreateCompetitionPageComponent,
    CompetitionFormComponent,
  ],
})
export class CompetitionModule {}
