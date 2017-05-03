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
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public getRedirect(redirectId: String) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.getRedirect(this.applicationService.id, redirectId)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public deleteRedirect(redirectId: String) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.deleteRedirect(this.applicationService.id, redirectId)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public postRedirect(params: Object) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.postRedirect(this.applicationService.id, params)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public putRedirect(redirectId: String, params: Object) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.putRedirect(this.applicationService.id, redirectId, params)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public postFromTo(redirectId: String, file: any) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.postFromTo(this.applicationService.id, redirectId, file)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public getFromTo(redirectId: String) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.getFromTo(this.applicationService.id, redirectId)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public getJob(redirectId: String, queue: string, jobId: String) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.redirect.getJob(this.applicationService.id, redirectId, queue, jobId)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }
}
