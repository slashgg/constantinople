import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'gg-select',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> {
  @Input() label: string;
  @Input() name: string;
  @Input() options: unknown[];
  @Input() valueKey: keyof (T);
  @Input() displayKey: keyof (T);
  @Input() control: FormControl;
}
