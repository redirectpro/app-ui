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
      this.applicationService.startLoading();
      this.apiService.redirect.getRedirects(this.applicationService.id)
        .subscribe(
          data => {
            this.applicationService.stopLoading();
            return resolve(data);
          }
        );
    });
  }

  public getRedirect(redirectId: String) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.getRedirect(this.applicationService.id, redirectId)
        .subscribe(
          data => {
            this.applicationService.stopLoading();
            return resolve(data);
          }
        );
    });
  }

  public deleteRedirect(redirectId: String) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.deleteRedirect(this.applicationService.id, redirectId)
        .subscribe(
          data => {
            this.applicationService.stopLoading();
            return resolve(data);
          }
        );
    });
  }

  public postRedirect(params: Object) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.postRedirect(this.applicationService.id, params)
        .subscribe(
          data => {
            this.applicationService.stopLoading();
            return resolve(data);
          }
        );
    });
  }

  public putRedirect(redirectId: String, params: Object) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.putRedirect(this.applicationService.id, redirectId, params)
        .subscribe(
          data => {
            this.applicationService.stopLoading();
            return resolve(data);
          }
        );
    });
  }

  public postUpload(redirectId: String, file: any) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.postUpload(this.applicationService.id, redirectId, file)
        .subscribe(
          data => {
            this.applicationService.stopLoading();
            return resolve(data);
          }
        );
    });
  }

  public getUploadJob(redirectId: String, jobId: String) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.getUploadJob(this.applicationService.id, redirectId, jobId)
        .subscribe(
          data => {
            this.applicationService.stopLoading();
            return resolve(data);
          }
        )
    })
  }
}
