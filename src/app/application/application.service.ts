import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ApplicationUserService } from './application-user.service';
import { ApplicationBillingService } from './application-billing.service';

@Injectable()
export class ApplicationService {
  id: String;
  user: ApplicationUserService;
  billing: ApplicationBillingService;
  initialized: Boolean = false;

  constructor(private apiService: ApiService) {
    this.user = new ApplicationUserService(this, this.apiService);
    this.billing = new ApplicationBillingService(this, this.apiService);
  }

  public initialize() {
    console.log('initialize.');
    this.user.updateProfile().then(() => {
      this.id = this.user.profile['applications'][0].id;
      const p1 = this.billing.updateProfile();
      const p2 = this.billing.updatePlans();

      Promise.all([p1, p2]).then(() => {
        this.initialized = true;
      }).catch((err) => {
      })
    });
  }
}
