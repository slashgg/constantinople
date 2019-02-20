import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user';

@Component({
  selector: 'gg-silent-callback',
  template: '',
})
export class SilentCallbackComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    console.log('test');
    this.userService.handleSilentSignin();
  }
}
