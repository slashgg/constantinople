import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'gg-table-header',
  templateUrl: './table-header.component.html',
})
export class TableHeaderComponent {
  @HostBinding('class') class = 'table-cell border-t border-b border-r gg-table-header border-grey-lighter';
  @Input() label: string;
}
