import { Component, Input } from '@angular/core';

@Component({
  selector: 'gg-form-group',
  templateUrl: './form-group.component.html',
})
export class FormGroupComponent {
  @Input() title: string;
}
