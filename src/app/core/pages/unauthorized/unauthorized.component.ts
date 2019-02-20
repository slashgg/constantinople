import { Component } from '@angular/core';
import { UserService } from '@core/services/user';

@Component({
  selector: 'gg-unauthorized',
  templateUrl: './unauthorized.component.html',
})
export class UnauthorizedComponent {
  constructor(private userService: UserService) {}

  public login() {
    this.userService.redirectToLogin();
  }
}
