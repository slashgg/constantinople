import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'gg-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.scss'],
})
export class TableHeadComponent {
  @HostBinding('class') class = 'gg-table-head';
  @Input() label: string;
}
