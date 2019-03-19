import { Component, Input } from '@angular/core';
import { TableRowComponent } from 'layout/components/table/table-row';
import { TournamentDetail } from 'tournament/models/tournament.model';

@Component({
  selector: 'gg-tournament-row',
  templateUrl: './tournament-row.component.html',
})
export class TournamentRowComponent extends TableRowComponent {
  @Input() tournament: TournamentDetail;
}
