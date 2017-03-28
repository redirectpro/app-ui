import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApiService } from './api.service';

@Injectable()
export class ApiBillingService {
  url: String;
  http: Http;

  constructor(private apiService: ApiService) {
    this.http = this.apiService.http;
    this.url = this.apiService.url + '/v1/billing';
  }

  public getPlans() {
    return this.http
      .get(this.url + '/plans', this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public getProfile(applicationId: String) {
    return this.http
      .get(this.url + `/${applicationId}/profile`, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public putCreditCard(applicationId: String, token: String) {
    return this.http
      .put(this.url + `/${applicationId}/creditCard/${token}`, undefined, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public putPlan(applicationId: String, planId: String) {
    return this.http
      .put(this.url + `/${applicationId}/plan/${planId}`, undefined, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public getPlanUpcomingCost(applicationId: String, planId: String) {
    return this.http
      .get(this.url + `/${applicationId}/plan/${planId}/upcomingCost`, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

}
