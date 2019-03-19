import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Competition } from '@core/models/competition';

@Component({
  selector: 'gg-competition-item',
  templateUrl: './competition-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitionItemComponent {
  @Input() competition: Competition;
  @Input() selected: boolean;
  @Output() select: EventEmitter<Competition> = new EventEmitter<Competition>();

  public onSelect() {
    this.select.emit(this.competition);
  }

  public competitionUrl() {
    return `/competitions/${this.competition.id}`;
  }
}
