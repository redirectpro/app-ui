import { Injectable } from '@angular/core';
import { ApplicationService } from '../../application/application.service';

declare var StripeCheckout: any;

@Injectable()
export class CreditCardService {

  constructor(public applicationService: ApplicationService) { }

  public updateCreditCard(callback = null) {
    const stripeHandler = StripeCheckout.configure({
      key: 'pk_test_gd8acLzybCR3OFkN5BQa8r5z',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: (token) => {
        console.log(token);
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
