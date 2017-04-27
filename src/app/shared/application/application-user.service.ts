import { Injectable } from '@angular/core';
import { ApplicationService } from './application.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class ApplicationUserService {
  public profile: Object;

  constructor(
    public applicationService: ApplicationService,
    public apiService: ApiService
  ) { }

  public getProfile() {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.user.getProfile()
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public updateProfile() {
    return new Promise ((resolve, reject) => {
      this.applicationService.startLoading();
      this.getProfile().then((data) => {
        this.applicationService.stopLoading();
        this.profile = data;
        return resolve(true);
      });
    });
  }

}
