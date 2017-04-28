import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../shared/application/application.service';
import { BillingService } from '../shared/billing.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-billing-credit-card',
  templateUrl: './billing-credit-card.component.html',
  styleUrls: ['./billing-credit-card.component.css']
})
export class BillingCreditCardComponent implements OnInit {
  billingService: BillingService;

  constructor(public applicationService: ApplicationService, public snackBar: MdSnackBar) {
    this.billingService = new BillingService(this.applicationService);
  }

  ngOnInit() {
  }

  updateCreditCard() {
    this.billingService.updateCreditCard(() => {
      this.snackBar.open('Your credit card has been changed.', 'CLOSE', { duration: 5000 });
    });
  }

}
