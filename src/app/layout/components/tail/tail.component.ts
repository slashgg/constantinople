import { Component, Input } from '@angular/core';

@Component({
  selector: 'gg-tail',
  templateUrl: './tail.component.html',
})
export class TailComponent {
  @Input() show: boolean;
}
