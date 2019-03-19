import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'gg-table-row',
  template: '<ng-content></ng-content>',
})
export class TableRowComponent {
  @HostBinding('class') class = 'table-row';
}
