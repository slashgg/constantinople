import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'gg-table-cell',
  templateUrl: './table-cell.component.html',
})
export class TableCellComponent {
  @HostBinding('class') class = 'table-cell';
}
