import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user';

@Component({
  selector: 'gg-login-callback',
  template: '<h1>Login Callback</h1>',
})
export class LoginCallbackComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit() {
    this.userService.handleSignin();
  }
}
