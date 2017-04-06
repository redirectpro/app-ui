import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ApplicationService } from './application/application.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  userProfile: Object;
  billingProfile: Object;

  constructor(public authService: AuthService, public applicationService: ApplicationService) { }

  ngOnInit() {
    if (this.authService.authenticated() === true) {
      this.applicationService.initialize();
    }
  }

}
