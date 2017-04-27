import { Injectable } from '@angular/core';
import { ApplicationService } from './application.service';
import { ApiService } from '../api/api.service';

@Injectable()
export class ApplicationBillingService {
  profile: Object;
  plans: Array<Object>;

  constructor(
    public applicationService: ApplicationService,
    public apiService: ApiService
  ) { }

  public getPlans() {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.billing.getPlans()
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public updatePlans() {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.getPlans().then((data: Array<Object>) => {
        this.plans = data;
        this.applicationService.stopLoading();
        return resolve(true);
      });
    });
  }

  public getProfile(applicationId: String = this.applicationService.id) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.billing.getProfile(applicationId)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public updateProfile(applicationId: String = this.applicationService.id) {
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.getProfile().then((data) => {
        this.applicationService.stopLoading();
        this.profile = data;
        return resolve(true);
      });
    });
  }

  public updateCreditCard(token) {
    const applicationId = this.applicationService.id;
    return new Promise ((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.billing.putCreditCard(applicationId, token)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public updateSubscription(planId) {
    const applicationId = this.applicationService.id;
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.billing.putPlan(applicationId, planId)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => {
            this.profile['subscription'] = data;
            return resolve(data);
          },
          err => { return reject(err); }
        );
    });
  }

  public getPlanUpcoming(planId) {
    const applicationId = this.applicationService.id;
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.billing.getPlanUpcoming(applicationId, planId)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => { return resolve(data); },
          err => { return reject(err); }
        );
    });
  }

  public cancelUpcomingPlan() {
    const applicationId = this.applicationService.id;
    return new Promise((resolve, reject) => {
      this.applicationService.startLoading();
      this.apiService.billing.postCancelUpcomingPlan(applicationId)
        .finally(() => { this.applicationService.stopLoading(); })
        .subscribe(
          data => {
            this.profile['subscription'].plan.upcomingPlanId = data.plan.upcomingPlanId;
            return resolve(data);
          },
          err => { return reject(err); }
        );
    });
  }

}
