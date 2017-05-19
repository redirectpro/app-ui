import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../shared/application/application.service';
import { DialogService } from '../../shared/dialog/dialog.service';
import { BillingService } from '../shared/billing.service';
import { MdSnackBar } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-plan',
  templateUrl: './billing-plan.component.html',
  styleUrls: ['./billing-plan.component.css']
})
export class BillingPlanComponent implements OnInit {
  billingService: BillingService;

  constructor(
      public applicationService: ApplicationService,
      public dialogService: DialogService,
      public snackBar: MdSnackBar
  ) {
    this.billingService = new BillingService(applicationService);
  }

  ngOnInit() {
  }

  updatePlan(planId: String) {
    const callback = () => {
      this.validatePlan(planId);
    };

    if (!this.applicationService.billing.profile['card']) {
      this.billingService.updateCreditCard(callback);
    } else {
      callback();
    }
  }

  validatePlan(planId: String) {
    const plan = this.applicationService.billing.plans.find(item => item['id'] === planId);
    this.applicationService.billing.getPlanUpcoming(planId).then((data) => {

      const dialogParams = {
        title: 'Confirm your new plan',
        declineText: 'Cancel',
        confirmText: 'Yes',
        message: ''
      };

      /* TODO: Verify if upcomingCost must be zero when doesn't have credit. */
      const upcomingCost = data['plan'].upcomingCost || plan['price'];
      let periodEnd = this.applicationService.billing.profile['subscription'].current_period_end;
      periodEnd = moment.unix(periodEnd).format('DD.MM.YYYY');

      dialogParams.message = `Your ${plan['name']} plan will cost ${upcomingCost} and it will be ` +
        `automatically charged ${plan['price']} every month on your credit card. `;

      if (data['at_period_end'] === true) {
        dialogParams.message += `Your plan will change on ${periodEnd}. `;
      } else {
        dialogParams.message += `Do you confirm?`;
      }

      this.dialogService.confirm(dialogParams).then((confirmed) => {
        if (confirmed === true) {
          this.applicationService.billing.updateSubscription(planId).then((billing) => {
            if (billing['plan'].upcomingPlanId) {
              this.snackBar.open('Your plan will be changed by the end the cycle.', 'CLOSE', { duration: 5000 });
            } else {
              this.snackBar.open('Plan has been updated.', 'CLOSE', { duration: 5000 });
            }
          });
        }
      });

    });
  }

  cancelUpcomingPlan() {
    this.applicationService.billing.cancelUpcomingPlan().then((data) => {
      this.snackBar.open('Your upcoming plan has been canceled.', 'CLOSE', { duration: 5000 });
      console.log(data);
    });
  }

}
