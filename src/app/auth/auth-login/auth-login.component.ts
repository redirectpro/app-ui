import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApplicationService } from '../../shared/application/application.service';
import { environment } from '../../../environments/environment';
import Auth0Lock from 'auth0-lock';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {
  lock: Auth0Lock;

  constructor(
    public activatedRoute: ActivatedRoute,
    public applicationService: ApplicationService
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      const returnUrl = params['returnUrl'];
      localStorage.setItem('return_url', returnUrl);
    });

    this.lock = new Auth0Lock(environment.auth0ClintId, environment.auth0Domain, {
      container: 'container-auth-login',
      auth: {
        redirectUrl: `${window.location.origin}/loginCallback`,
        responseType: 'token',
        params: {
          scope: 'openid email'
        }
      }
    });

  }

  ngOnInit() {
    this.lock.show();
  }

}
