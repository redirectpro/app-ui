import { Component, OnInit } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { ApplicationService } from './shared/application/application.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  userProfile: Object;
  billingProfile: Object;

  constructor(public applicationService: ApplicationService) {
  }

  ngOnInit() {
    if (tokenNotExpired()) {
      this.applicationService.initialize();
    }
  }

}
