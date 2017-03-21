import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BillingService } from '../billing.service';
import { PlanService } from './plan.service';
import { ApiService } from '../../api/api.service';
import { MdDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';

import * as _ from 'lodash';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  billingService: BillingService;
  planService: PlanService;
  planList: Array<Object>;

  constructor(private authService: AuthService, private apiService: ApiService, public dialog: MdDialog) {
    // console.log(authService.userProfile);
  }

  ngOnInit() {
    this.billingService = new BillingService(this.apiService);
    this.planService = new PlanService();
    this.planList = this.planService.getPlans();
  }

  changePlan(id: String) {
    const plan = _.find(this.planList, { id: id });
    const userProfile = this.authService.getUserProfile();

    const setNewPlan = () => {
      this.billingService.setPlan({ plan_id: plan.id, callback: () => {
        this.authService.updateUserProfile();
      } });
    };

    const confirmPlan = (planCost) => {
      const dialogRef = this.dialog.open(DialogComponent);
      dialogRef.componentInstance.type = 'confirm';
      dialogRef.componentInstance.title = 'Confirm your new plan';
      dialogRef.componentInstance.message = `Your ${plan.name} plan will cost ${planCost} and ` +
        `it will be automatically charged ${plan.price} every month on your credit card. Do you confirm?`;

      const confirm = dialogRef.componentInstance.onConfirm.subscribe(() => {
        setNewPlan();
      });

      dialogRef.afterClosed().subscribe(result => {
        confirm.unsubscribe();
      });
    };

    const upcomingCost = () => {
      this.billingService.getPlanUpcomingCost({ plan_id: plan.id, callback: (cost) => {
        confirmPlan(cost);
      }});
    }

    if (!userProfile.stripe.card) {
      this.billingService.setCreditCard({
        name: userProfile.nickname,
        email: userProfile.email,
        callback: upcomingCost
      });
    } else {
      upcomingCost();
    }

  }

}
