import { Injectable } from '@angular/core';
import { ApplicationService } from './application.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class ApplicationRedirectService {
  applicationId: String;

  constructor(
    public applicationService: ApplicationService,
    public apiService: ApiService
  ) {
  }

  public getRedirects() {
    return new Promise((resolve, reject) => {
      this.apiService.redirect.getRedirects(this.applicationService.id)
        .subscribe(
          data => {
            return resolve(data);
          }
        );
    });
  }

  public getRedirect(redirectId: String) {
    return new Promise((resolve, reject) => {
      this.apiService.redirect.getRedirect(this.applicationService.id, redirectId)
        .subscribe(
          data => {
            return resolve(data);
          }
        );
    });
  }

  public deleteRedirect(redirectId: String) {
    return new Promise((resolve, reject) => {
      this.apiService.redirect.deleteRedirect(this.applicationService.id, redirectId)
        .subscribe(
          data => {
            return resolve(data);
          }
        );
    });
  }

  public postRedirect(params: Object) {
    return new Promise((resolve, reject) => {
      this.apiService.redirect.postRedirect(this.applicationService.id, params)
        .subscribe(
          data => {
            return resolve(data);
          }
        );
    });
  }

  public putRedirect(redirectId: String, params: Object) {
    return new Promise((resolve, reject) => {
      this.apiService.redirect.putRedirect(this.applicationService.id, redirectId, params)
        .subscribe(
          data => {
            return resolve(data);
          }
        );
    });
  }
}
