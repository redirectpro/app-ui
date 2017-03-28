import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { ApiUserService } from './api-user.service';
import { ApiBillingService } from './api-billing.service'

@Injectable()
export class ApiService {
  user: ApiUserService;
  billing: ApiBillingService;
  url: String;

  constructor(public http: Http) {
    this.url =  environment.baseUrl;

    this.user = new ApiUserService(this);
    this.billing = new ApiBillingService(this);
  }

  public requestOptions() {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    });
    const requestOptions = new RequestOptions({ headers: headers });
    return requestOptions;
  }

  public extractData(res: Response) {
    return res.json();
  }

  public handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  // apiPutCreditCard: any;
  // apiPutPlan: any;
  // apiPostPlanUpcomingCost: any;

  //   const apiUrl = environment.baseUrl + '/v1';
  //   const headers = new Headers({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + localStorage.getItem('id_token')
  //   });
  //   const options = new RequestOptions({ headers: headers });

  //   this.apiPutCreditCard = (parameters) => {
  //     console.log(parameters.token);
  //     this.http
  //       .put(apiUrl + '/user/creditcard', { token: parameters.token.id }, options)
  //       .map((res: Response) => res.json())
  //       .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  //       .subscribe(
  //         data => {
  //           if (parameters.callback) { parameters.callback(); }
  //           return true;
  //         },
  //         error => {
  //           console.error('Error saving credit card!');
  //           return Observable.throw(error);
  //         }
  //       );
  //   };

  //   this.apiPutPlan = (parameters) => {
  //     this.http
  //       .put(apiUrl + '/user/plan', { plan_id: parameters.plan_id }, options)
  //       .map((res: Response) => res.json())
  //       .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  //       .subscribe(
  //         data => {
  //           if (parameters.callback) { parameters.callback(); }
  //           return true;
  //         },
  //         error => {
  //           console.error('Error saving plan!');
  //           return Observable.throw(error);
  //         }
  //       );
  //   };

  //   this.apiPostPlanUpcomingCost = (parameters) => {
  //     this.http
  //       .post(apiUrl + '/user/planUpcomingCost', { plan_id: parameters.plan_id }, options)
  //       .map((res: Response) => res.json())
  //       .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  //       .subscribe(
  //         data => {
  //           if (parameters.callback) { parameters.callback(data.cost); }
  //           return true;
  //         },
  //         error => {
  //           console.error('Error saving plan!');
  //           return Observable.throw(error);
  //         }
  //       );
  //   };
  // }
}
