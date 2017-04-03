import { Injectable } from '@angular/core';
import { ApplicationService } from './application.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class ApplicationBillingService {
  profile: Object;
  plans: Array<Object>;

  constructor(
    private applicationService: ApplicationService,
    private apiService: ApiService
  ) { }

  public getPlans() {
    return new Promise((resolve, reject) => {
      this.apiService.billing.getPlans()
        .subscribe(
          data => {
            return resolve(data);
          }
        );
    });
  }

  public updatePlans() {
    return new Promise((resolve, reject) => {
      this.getPlans().then((data: Array<Object>) => {
        this.plans = data;
        resolve(true);
      });
    });
  }

  public getProfile(applicationId: String = this.applicationService.id) {
    return new Promise((resolve, reject) => {
      this.apiService.billing.getProfile(applicationId)
        .subscribe(
          data => {
            return resolve(data);
          }
        );
    });
  }

  public updateProfile(applicationId: String = this.applicationService.id) {
    return new Promise((resolve, reject) => {
      this.getProfile().then((data) => {
        this.profile = data;
        return resolve(true);
      });
    });
  }

  public updateCreditCard(token) {
    const applicationId = this.applicationService.id;
    return new Promise ((resolve, reject) => {
      this.apiService.billing.putCreditCard(applicationId, token)
        .subscribe(
          data => {
            return resolve(data);
          }
        );
    });
  }

  public updateSubscription(planId) {
    const applicationId = this.applicationService.id;
    return new Promise((resolve, reject) => {
      this.apiService.billing.putPlan(applicationId, planId)
        .subscribe(
          data => {
            this.profile['subscription'] = data;
            return resolve(data);
          }
        );
    });
  }

  public getPlanUpcoming(planId) {
    const applicationId = this.applicationService.id;
    return new Promise((resolve, reject) => {
      this.apiService.billing.getPlanUpcoming(applicationId, planId)
        .subscribe(
          data => {
            return resolve(data);
          }
        );
    });
  }

  public cancelUpcomingPlan() {
    const applicationId = this.applicationService.id;
    return new Promise((resolve, reject) => {
      this.apiService.billing.postCancelUpcomingPlan(applicationId)
        .subscribe(
          data => {
            this.profile['subscription'].plan.upcomingPlanId = data.plan.upcomingPlanId;
            return resolve(data);
          }
        );
    });
  }

}
