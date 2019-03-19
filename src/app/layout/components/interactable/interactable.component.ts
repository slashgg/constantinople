import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gg-interactable',
  templateUrl: './interactable.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractableComponent {
  @Output() click: EventEmitter<void> = new EventEmitter<void>();
  @Input() selected: boolean;
  @Input() linkTo: string | string[];

  constructor(private router: Router) {}

  onClick(event: Event) {
    event.stopPropagation();
    if (this.linkTo) {
      if (typeof this.linkTo === 'string') {
        this.router.navigateByUrl(this.linkTo);
      } else if (Array.isArray(this.linkTo)) {
        this.router.navigate(this.linkTo);
      }
      return;
    } else {
      this.click.emit();
    }
  }

  class() {
    return {
      'hover:bg-primary-light hover:text-white cursor-pointer rounded': true,
      'bg-primary-lighter': this.selected,
      'text-white': this.selected,
    };
  }
}
