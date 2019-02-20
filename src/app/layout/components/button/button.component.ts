import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Alternative = 'alternative',
  Accent = 'accent',
}

@Component({
  selector: 'gg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Output() click: EventEmitter<void> = new EventEmitter<void>();
  @Input() disabled = false;
  @Input() type: ButtonType = ButtonType.Primary;
  @Input() hollow = false;

  public onClick() {
    this.click.emit();
  }

  public classes() {
    const classes = {
      'btn flex items-center justify-center transition shadow min-w-20 py-2 px-3 outline-none uppercase': true,
      'hollow border': this.hollow,
      rounded: true,
      [this.type]: true,
    };

    return classes;
  }
}
