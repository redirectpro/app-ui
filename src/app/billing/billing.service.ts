import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
declare var StripeCheckout: any;

@Injectable()
export class BillingService {
  http: Http;

  constructor(private _http: Http) {
    this.http = _http;
  }

  setCreditCard(parameters) {
    const apiUrl = environment.baseUrl + '/v1/user/creditcard';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    });
    const options = new RequestOptions({ headers: headers });

    const stripeHandler = StripeCheckout.configure({
      key: 'pk_test_gd8acLzybCR3OFkN5BQa8r5z',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: (token) => {
        console.log(token);
        this.http
          .put(apiUrl, { token: token.id }, options)
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
          .subscribe(
            data => {
              console.log(data);
              return true;
            },
            error => {
              console.error('Error saving food!');
              return Observable.throw(error);
            }
          );

        if (parameters.callback) {
          parameters.callback();
        }
      }
    });

    stripeHandler.open({
      email: parameters.email,
      name: parameters.name,
      description: parameters.description || 'Setting your credit card',
      zipCode: true,
      allowRememberMe: false,
      panelLabel: parameters.panelLabel || 'Save'
    });

  }

}
