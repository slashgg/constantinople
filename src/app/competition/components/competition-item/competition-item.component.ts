import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Competition } from "@core/models/competition";

@Component({
  selector: "gg-competition-item",
  templateUrl: "./competition-item.component.html",
})
export class CompetitionItemComponent {
  @Input() competition: Competition;
  @Output() select: EventEmitter<Competition> = new EventEmitter<Competition>();

  public onSelect() {
    this.select.emit(this.competition);
  }
}
