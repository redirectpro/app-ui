import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../application/application.service';
import { CreditCardService } from './credit-card.service';


@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  creditCardService: CreditCardService;

  constructor(private applicationService: ApplicationService) {
    this.creditCardService = new CreditCardService(this.applicationService);
  }

  ngOnInit() {
  }

  updateCreditCard() {
    this.creditCardService.updateCreditCard();
  }

}
