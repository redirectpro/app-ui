import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';
import { PlanService } from './plan.service';
import { AuthService } from '../../auth/auth.service';

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

  constructor(private authService: AuthService, private http: Http) { }

  ngOnInit() {
    this.billingService = new BillingService(this.http);
    this.planService = new PlanService();
    this.planList = this.planService.getPlans();
  }

  changePlan(id: String) {
    const plan = _.find(this.planList, { id: id });
    const userProfile = this.authService.getUserProfile();

    const testCallback = () => {
      console.log('test callback');
    }

    if (true) { //!userProfile.stripe.card) {
      this.billingService.setCreditCard({
        name: userProfile.nickname,
        email: userProfile.email,
        callback: testCallback
      });
    }

    // validateCreditCard / set or next
    // dialog to confirm / set or cancel
    // if set, update plan and change localStorage
  }

}
