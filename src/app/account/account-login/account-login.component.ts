import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account-login',
  template: 'account-login works! redirecting...',
  providers: [AuthService]
})
export class AccountLoginComponent implements OnInit {

  constructor(private authService: AuthService) {
    authService.login();
  }

  ngOnInit() {
  }

}
