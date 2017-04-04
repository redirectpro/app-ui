import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api.service';

@Injectable()
export class ApiRedirectService {
  url: String;
  http: Http;

  constructor(private apiService: ApiService) {
    this.http = this.apiService.http;
    this.url = this.apiService.url + '/v1';
  }

  public getRedirects(applicationId: String) {
    return this.http
      .get(this.url + `/${applicationId}/redirects`, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public postRedirect(applicationId: String, params: Object) {
    return this.http
      .post(this.url + `/${applicationId}/redirect`, params, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public getRedirect(applicationId: String, redirectId: String) {
    return this.http
      .get(this.url + `/${applicationId}/redirect/${redirectId}`, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public putRedirect(applicationId: String, redirectId: String, params) {
    return this.http
      .put(this.url + `/${applicationId}/redirect/${redirectId}`, params, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

  public deleteRedirect(applicationId: String, redirectId) {
    return this.http
      .delete(this.url + `/${applicationId}/redirect/${redirectId}`, this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

}
