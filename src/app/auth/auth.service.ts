import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { ApplicationService } from '../application/application.service';
import { environment } from '../../environments/environment';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  // Configure Auth0
  lock = new Auth0Lock(environment.auth0ClintId, environment.auth0Domain, {
    auth: {
      redirectUrl: window.location.origin,
      responseType: 'token',
      params: {
        scope: 'openid email'
      }
    }
  });

  // Store profile object in auth class
  userProfile: Object;

  constructor(public router: Router, public applicationService: ApplicationService) {
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('access_token', authResult.accessToken);
      this.applicationService.initialize().then(() => {
        const redirectUrl = localStorage.getItem('redirect_url');
        if (redirectUrl) {
          localStorage.removeItem('redirect_url');
          this.router.navigateByUrl(redirectUrl);
        }
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_profile');
    this.router.navigate(['/']);
    this.userProfile = undefined;
  }

  // public getUserProfile() {
  //   return JSON.parse(localStorage.getItem('user_profile'));
  // }
}
