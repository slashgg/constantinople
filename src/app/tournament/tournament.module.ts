import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'layout';
import { TournamentRowComponent } from 'tournament/components/tournament-row';
import { TournamentListPageComponent } from 'tournament/pages/pages/tournament-list';
import { TournamentRoutingModule } from 'tournament/tournament-routing.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LayoutModule, TournamentRoutingModule],
  declarations: [TournamentListPageComponent, TournamentRowComponent],
})
export class TournamentModule {}
