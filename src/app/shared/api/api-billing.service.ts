import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api.service';

@Injectable()
export class ApiBillingService {
  url: String;
  http: Http;

  constructor(private apiService: ApiService) {
    this.http = this.apiService.http;
    this.url = this.apiService.url + '/v1';
  }

  public getPlans() {
    return this.http
      .get(this.url + '/billing/plans', this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public getProfile(applicationId: String) {
    return this.http
      .get(this.url + `/${applicationId}/billing/profile`, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public putCreditCard(applicationId: String, token: String) {
    return this.http
      .put(this.url + `/${applicationId}/billing/creditCard/${token}`, undefined, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public putPlan(applicationId: String, planId: String) {
    return this.http
      .put(this.url + `/${applicationId}/billing/plan/${planId}`, undefined, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public getPlanUpcoming(applicationId: String, planId: String) {
    return this.http
      .get(this.url + `/${applicationId}/billing/plan/${planId}/upcoming`, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public postCancelUpcomingPlan(applicationId: String) {
    return this.http
      .post(this.url + `/${applicationId}/billing/cancelUpcomingPlan`, undefined, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

}
