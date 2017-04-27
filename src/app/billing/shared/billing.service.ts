import { Injectable } from '@angular/core';
import { ApplicationService } from '../../shared/application/application.service';
import { environment } from '../../../environments/environment';

declare var StripeCheckout: any;

@Injectable()
export class BillingService {

  constructor(public applicationService: ApplicationService) { }

  public updateCreditCard(callback = null) {
    this.applicationService.startLoading();

    const stripeHandler = StripeCheckout.configure({
      key: environment.stripePublicKey,
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      opened: () => {
        this.applicationService.stopLoading();
      },
      token: (token) => {
        this.applicationService.billing.updateCreditCard(token.id).then((card) => {
          this.applicationService.billing.profile['card'] = card;
          if (callback) {
            callback();
          }
        });
      }
    });

    stripeHandler.open({
      email: this.applicationService.billing.profile['email'],
      description: 'Setting your credit card',
      zipCode: true,
      allowRememberMe: false,
      panelLabel: 'Save'
    });
  }

}
