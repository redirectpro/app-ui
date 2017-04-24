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
      this.apiService.user.getProfile()
        .subscribe(
          data => {
            return resolve(data);
          }
        );
    });
  }

  public updateProfile() {
    return new Promise ((resolve, reject) => {
      this.getProfile().then((data) => {
        this.profile = data;
        resolve(true);
      });
    });
  }

}
