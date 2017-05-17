import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { ApiUserService } from './api-user.service';
import { ApiBillingService } from './api-billing.service';
import { ApiRedirectService } from './api-redirect.service';

@Injectable()
export class ApiService {
  user: ApiUserService;
  billing: ApiBillingService;
  redirect: ApiRedirectService;
  url: String;

  constructor(public http: Http) {
    this.url =  environment.apiUrl;

    this.user = new ApiUserService(this);
    this.billing = new ApiBillingService(this);
    this.redirect = new ApiRedirectService(this);
  }

  public requestOptions(sendingFile: Boolean = false) {
    const headers = new Headers({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    if (!sendingFile) {
      headers.append('Content-Type', 'application/json');
    }

    const requestOptions = new RequestOptions({ headers: headers });
    return requestOptions;
  }

  public extractData(res: Response) {
    return res.json();
  }

  public handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = JSON.parse(JSON.stringify(error)) || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(error);
  }

  public getContent(url: string) {
    return this.http
      .get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
