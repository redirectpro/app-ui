import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../shared/application/application.service';
import { BillingService } from '../shared/billing.service';


@Component({
  selector: 'app-billing-credit-card',
  templateUrl: './billing-credit-card.component.html',
  styleUrls: ['./billing-credit-card.component.css']
})
export class BillingCreditCardComponent implements OnInit {
  billingService: BillingService;

  constructor(public applicationService: ApplicationService) {
    this.billingService = new BillingService(this.applicationService);
  }

  ngOnInit() {
  }

  updateCreditCard() {
    this.billingService.updateCreditCard();
  }

}
