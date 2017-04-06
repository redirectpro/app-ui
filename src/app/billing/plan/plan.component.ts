import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ApplicationService } from '../../application/application.service';
import { DialogService } from '../../dialog/dialog.service';
import { CreditCardService } from '../credit-card/credit-card.service';
import * as moment from 'moment';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  creditCardService: CreditCardService;

  constructor(
      public applicationService: ApplicationService,
      public dialogService: DialogService
  ) {
    this.creditCardService = new CreditCardService(applicationService);
  }

  ngOnInit() {
  }

  updatePlan(planId: String) {
    console.log(this.applicationService.billing.profile);

    const callback = () => {
      this.validatePlan(planId);
    };

    if (!this.applicationService.billing.profile['card']) {
      this.creditCardService.updateCreditCard(callback);
    } else {
      callback();
    }
  }

  validatePlan(planId: String) {
    const plan = this.applicationService.billing.plans.find(item => item['id'] === planId);
    this.applicationService.billing.getPlanUpcoming(planId).then((data) => {

      console.log(data);

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
          this.applicationService.billing.updateSubscription(planId);
        }
      });

    });
  }

  cancelUpcomingPlan() {
    this.applicationService.billing.cancelUpcomingPlan().then((data) => {
      console.log(data);
    });
  }

}
