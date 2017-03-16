import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  // Configure Auth0
  lock = new Auth0Lock('n1K6ZPkvgD7eLuKLXCBOy8d3dfnKlTAc', 'keepat.eu.auth0.com', {
    auth: {
      redirectUrl: window.location.origin,
      responseType: 'token',
      params: {
        scope: 'openid email' // Learn about scopes: https://auth0.com/docs/scopes
      }
    }
  });

  // Store profile object in auth class
  userProfile: Object;

  constructor(private router: Router) {

    // Set userProfile attribute of already saved profile
    this.userProfile = this.getUserProfile();

    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('access_token', authResult.accessToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        delete profile.app_metadata;
        localStorage.setItem('user_profile', JSON.stringify(profile));
        this.userProfile = profile;

        const redirectUrl: string = localStorage.getItem('redirect_url');
        if (redirectUrl !== undefined) {
          // this.router.navigate([redirectUrl]);
          // localStorage.removeItem('redirect_url');
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

  public getUserProfile() {
    return JSON.parse(localStorage.getItem('user_profile'));
  }
}
