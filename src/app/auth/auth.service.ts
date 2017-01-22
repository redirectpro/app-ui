import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: Http, private router: Router) { }

  register() {
    const apiUrl = environment.apiUrl
      + '/v1/auth/register'
      + '?callbackUrl='
      + encodeURIComponent(window.location.origin + '/auth/id-site-result/register');

    this.http.get(apiUrl)
    .subscribe(
        res => {
          window.location.href = res.json().redirectUrl;
        }
     );
  }

  login() {
    const apiUrl = environment.apiUrl
      + '/v1/auth/login'
      + '?callbackUrl='
      + encodeURIComponent(window.location.origin + '/auth/id-site-result/login');

    this.http.get(apiUrl)
    .subscribe(
        res => {
          window.location.href = res.json().redirectUrl;
        }
     );
  }

  logout() {
    const apiUrl = environment.apiUrl
      + '/v1/auth/logout'
      + '?callbackUrl='
      + encodeURIComponent(window.location.origin + '/auth/id-site-result/logout');

    this.http.get(apiUrl)
    .subscribe(
        res => {
          window.location.href = res.json().redirectUrl;
        }
     );
  }

  idSiteResultLogin(jwtResponse: string, callback: any) {
    const apiUrl = environment.apiUrl
      + '/v1/auth/idSiteResult'
      + '?jwtResponse='
      + encodeURIComponent(jwtResponse);

    this.http.get(apiUrl)
    .subscribe(
        res => {
          const json = res.json()
          localStorage.setItem('access_token', json.access_token);
          localStorage.setItem('refresh_token', json.refresh_token);
          localStorage.setItem('expires_in', json.expires_in);
          callback();
        }
    );
  }

  idSiteResultLogout(callback: any) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
    callback();
  }

  isLogged() {
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      return false;
    }
  }

}
