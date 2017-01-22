import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-id-site-result',
  template: 'auth-id-site-result works! redirecting...',
  providers: [AuthService]
})
export class AuthIdSiteResultComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      const action = params['action'];
      let myCallback;

      if (action === 'login' || action === 'register') {
        this.route.queryParams.forEach((queryParams: Params) => {
          myCallback = () : void => {
            this.router.navigate(['/dashboard']);
          };

          const jwtResponse = queryParams['jwtResponse'];
          this.authService.idSiteResultLogin(jwtResponse,myCallback);
        });
      } else {
        myCallback = () : void => {
          this.router.navigate(['/']);
        };

        this.authService.idSiteResultLogout(myCallback);
      }

    });


  }

}
