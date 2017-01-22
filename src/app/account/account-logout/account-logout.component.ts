import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account-logout',
  template: 'account-logout works! redirecting...',
  providers: [AuthService]
})
export class AccountLogoutComponent implements OnInit {

  constructor(private authService: AuthService) {
    authService.logout()
  }

  ngOnInit() {
  }

}
