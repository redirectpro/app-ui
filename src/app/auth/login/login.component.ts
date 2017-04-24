import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApplicationService } from '../../application/application.service';
import { environment } from '../../../environments/environment';
import Auth0Lock from 'auth0-lock';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lock: Auth0Lock;
  onAuthenticated: Boolean;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public applicationService: ApplicationService
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      const returnUrl = params['returnUrl'];
      localStorage.setItem('return_url', returnUrl);
    });

    this.lock = new Auth0Lock(environment.auth0ClintId, environment.auth0Domain, {
      container: 'container-login',
      auth: {
        redirectUrl: window.location.href,
        responseType: 'token',
        params: {
          scope: 'openid email'
        }
      }
    });

    this.lock.on('authenticated', (authResult) => {
      this.lock.hide();
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('access_token', authResult.accessToken);
      this.applicationService.initialize().then(() => {
        const returnUrl = localStorage.getItem('return_url');
        if (returnUrl) {
          localStorage.removeItem('return_url');
          this.router.navigateByUrl(returnUrl);
        } else {
          this.router.navigate(['']);
        }
      });
    });

  }

  ngOnInit() {
    this.lock.show();
  }

}
