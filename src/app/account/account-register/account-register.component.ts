import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account-register',
  template: 'account-register works! redirecting...',
})
export class AccountRegisterComponent implements OnInit {

  constructor(private authService: AuthService) {
    authService.register();
  }

  ngOnInit() {
  }

}
