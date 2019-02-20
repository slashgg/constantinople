import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gg-interactable',
  templateUrl: './interactable.component.html',
})
export class InteractableComponent {
  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
