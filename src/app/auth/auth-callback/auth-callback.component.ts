import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { ApplicationService } from '../../shared/application/application.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  isAuthenticated: Boolean = false;
  lock: Auth0Lock;

  constructor(
    public router: Router,
    public applicationService: ApplicationService
) {
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

    this.lock.on('authenticated', (authResult) => {
      this.isAuthenticated = true
      localStorage.setItem('token', authResult.idToken);
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
    setTimeout(() => {
      if (this.isAuthenticated === false) {
        this.router.navigate(['/login']);
      }
    }, 6000)
  }

}
