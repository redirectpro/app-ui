import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ApiService } from './api.service';

@Injectable()
export class ApiUserService {
  url: String;
  http: Http;

  constructor(private apiService: ApiService) {
    this.http = this.apiService.http;
    this.url = this.apiService.url + '/v1/user';
  }

  public getProfile() {
    return this.http
      .get(this.url + '/profile', this.apiService.requestOptions())
      .map(this.apiService.extractData)
      .catch(this.apiService.handleError);
  }

}
