import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'gg-text-area',
  templateUrl: './text-area.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() name: string;
  @Input() textAreaClass = '';

  public textAreaClasses() {
    return {
      'input py-2 pl-3 bg-white border border-grey-lighter w-full rounded': true,
      [this.textAreaClass]: true,
    };
  }
}
