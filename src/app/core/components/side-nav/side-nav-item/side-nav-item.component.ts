import { Component, Input } from '@angular/core';

@Component({
  selector: 'gg-side-nav-item',
  templateUrl: './side-nav-item.component.html',
})
export class SideNavItemComponent {
  @Input() label: string;
  @Input() linkTo: string | string[];
}
