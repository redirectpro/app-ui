import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (tokenNotExpired()) {
      return true;
    } else {
      // Save URL to redirect to after login and fetching profile to get roles
      // localStorage.setItem('redirect_url', state.url);
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

  }
}
