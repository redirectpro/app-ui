import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ApiService } from '../api/api.service';
declare var StripeCheckout: any;

@Injectable()
export class BillingService {

  constructor(private apiService: ApiService) { }

  setCreditCard(parameters) {
    const stripeHandler = StripeCheckout.configure({
      key: 'pk_test_gd8acLzybCR3OFkN5BQa8r5z',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: (token) => {
        return this.apiService.apiPutCreditCard({ token: token, callback: parameters.callback });
      }
    });

    stripeHandler.open({
      email: parameters.email,
      name: parameters.name,
      description: parameters.description || 'Setting your credit card',
      zipCode: true,
      allowRememberMe: false,
      panelLabel: parameters.panelLabel || 'Save'
    });
  }

  setPlan(parameters) {
    return this.apiService.apiPutPlan({ plan_id: parameters.plan_id, callback: parameters.callback });
  }

  getPlanUpcomingCost(parameters) {
    return this.apiService.apiPostPlanUpcomingCost({
      plan_id: parameters.plan_id,
      callback: parameters.callback
    });
  }
}
