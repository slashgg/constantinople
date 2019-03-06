import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'gg-text-input',
  templateUrl: './text-input.component.html',
})
export class TextInputComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() name: string;
}
