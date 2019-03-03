import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompetitionRoutingModule } from 'competition/competition-routing.module';
import { CompetitionItemComponent } from 'competition/components/competition-item';
import { CompetitionSelectPageComponent } from 'competition/pages/competition-select';
import { LayoutModule } from 'layout';

@NgModule({
  imports: [CommonModule, LayoutModule, CompetitionRoutingModule],
  declarations: [CompetitionSelectPageComponent, CompetitionItemComponent],
})
export class CompetitionModule {}
