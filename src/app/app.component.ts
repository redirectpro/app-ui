import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './application/application.service';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  userProfile: Object;
  billingProfile: Object;

  constructor(public applicationService: ApplicationService) { }

  ngOnInit() {
    if (tokenNotExpired()) {
      this.applicationService.initialize();
    }
  }

}
