import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {
  apiPutCreditCard: any;
  apiPutPlan: any;
  apiPostPlanUpcomingCost: any;

  constructor(private http: Http) {

    const apiUrl = environment.baseUrl + '/v1';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    });
    const options = new RequestOptions({ headers: headers });

    this.apiPutCreditCard = (parameters) => {
      console.log(parameters.token);
      this.http
        .put(apiUrl + '/user/creditcard', { token: parameters.token.id }, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe(
          data => {
            if (parameters.callback) { parameters.callback(); }
            return true;
          },
          error => {
            console.error('Error saving credit card!');
            return Observable.throw(error);
          }
        );
    };

    this.apiPutPlan = (parameters) => {
      this.http
        .put(apiUrl + '/user/plan', { plan_id: parameters.plan_id }, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe(
          data => {
            if (parameters.callback) { parameters.callback(); }
            return true;
          },
          error => {
            console.error('Error saving plan!');
            return Observable.throw(error);
          }
        );
    };

    this.apiPostPlanUpcomingCost = (parameters) => {
      this.http
        .post(apiUrl + '/user/planUpcomingCost', { plan_id: parameters.plan_id }, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
        .subscribe(
          data => {
            if (parameters.callback) { parameters.callback(data.cost); }
            return true;
          },
          error => {
            console.error('Error saving plan!');
            return Observable.throw(error);
          }
        );
    };
  }
}
