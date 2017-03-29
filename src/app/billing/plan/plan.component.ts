import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ApplicationService } from '../../application/application.service';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  constructor(
      private applicationService: ApplicationService,
      public dialogService: DialogService
  ) { }

  ngOnInit() {
  }

  updatePlan(planId: String) {
    this.validatePlan(planId);
    // this.confirmPlan(planId, () => {
    //   this.applicationService.billing.updateSubscription(planId);
    // });
  }

  validatePlan(planId: String) {
    const dialogParams = {
      message: `Você não pode mudar....`,
      declineText: 'Confirm',
      confirmText: 'Ok'
    };

    this.dialogService.confirm(dialogParams).then(() => {
      console.log('alert');
    });
  }

  confirmPlan(planId: String, callback) {
    const plan = this.applicationService.billing.plans.find(item => item['id'] === planId);
    this.applicationService.billing.getPlanUpcomingCost(planId).then((data) => {

      const dialogParams = {
        title: 'Confirm your new plan',
        message: `Your ${plan['name']} plan will cost ${data['cost']} and it will be ` +
                 `automatically charged ${plan['price']} every month on your credit card. ` +
                 `Do you confirm?`,
        declineText: 'Cancel',
        confirmText: 'Yes'
      };

      this.dialogService.confirm(dialogParams).then((confirmed) => {
        if (confirmed === true) {
          callback();
        }
      });

    });
  }

}
