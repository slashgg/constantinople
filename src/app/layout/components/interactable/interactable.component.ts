import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gg-interactable',
  templateUrl: './interactable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractableComponent {
  @Output() click: EventEmitter<void> = new EventEmitter<void>();
  @Input() selected: boolean;

  onClick(event: Event) {
    event.stopPropagation();
    this.click.emit();
  }

  class() {
    return {
      'hover:bg-primary-light hover:text-white cursor-pointer': true,
      'bg-primary-light': this.selected,
      'text-white': this.selected,
    };
  }
}
