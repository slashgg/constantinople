import { Component, Input } from '@angular/core';

@Component({
  selector: 'gg-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() closeOnHoverOut = false;
  public showDropdown = false;

  public toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  public closeDropdown() {
    this.showDropdown = false;
  }
}
