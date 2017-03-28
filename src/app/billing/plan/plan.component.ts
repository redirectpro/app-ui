import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BillingService } from '../billing.service';
// import { PlanService } from './plan.service';
import { ApplicationService } from '../../application/application.service';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  constructor(private applicationService: ApplicationService, public dialog: MdDialog) {
  }

  ngOnInit() {
  }

  updatePlan(planId: String) {
    this.confirmPlan(planId, () => {
      this.applicationService.billing.updateSubscription(planId);
    });
  }

  confirmPlan(planId: String, callback) {
    const plan = this.applicationService.billing.plans.find(item => item['id'] === planId);
    this.applicationService.billing.getPlanUpcomingCost(planId).then((data) => {
      const dialogRef = this.dialog.open(DialogComponent);

      dialogRef.componentInstance.type = 'confirm';
      dialogRef.componentInstance.title = 'Confirm your new plan';
      dialogRef.componentInstance.message = `Your ${plan['name']} plan will cost ${data['cost']} and ` +
        `it will be automatically charged ${plan['price']} every month on your credit card. Do you confirm?`;

      const confirm = dialogRef.componentInstance.onConfirm.subscribe(() => {
        callback();
      });

      dialogRef.afterClosed().subscribe(result => {
        confirm.unsubscribe();
      });

    });
  }

  // changePlan(id: String) {
  //   const findParameters = { id: id };
  //   const plan = this.planList.find(item => item['id'] === id);

    // const confirmPlan = (planCost) => {
    //   const dialogRef = this.dialog.open(DialogComponent);
    //   dialogRef.componentInstance.type = 'confirm';
    //   dialogRef.componentInstance.title = 'Confirm your new plan';
    //   dialogRef.componentInstance.message = `Your ${plan['name']} plan will cost ${planCost} and ` +
    //     `it will be automatically charged ${plan['price']} every month on your credit card. Do you confirm?`;

    //   const confirm = dialogRef.componentInstance.onConfirm.subscribe(() => {
    //     setNewPlan();
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //     confirm.unsubscribe();
    //   });
    // };

    // const upcomingCost = () => {
    //   this.billingService.getPlanUpcomingCost({ plan_id: plan['id'], callback: (cost) => {
    //     confirmPlan(cost);
    //   }});
    // }

    // if (!userProfile.stripe.card) {
    //   this.billingService.setCreditCard({
    //     name: userProfile.nickname,
    //     email: userProfile.email,
    //     callback: upcomingCost
    //   });
    // } else {
    //   upcomingCost();
    // }

  // }

}
