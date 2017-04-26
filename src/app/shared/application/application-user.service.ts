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
        .subscribe(
          data => {
            this.applicationService.stopLoading();
            return resolve(data);
          }
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
