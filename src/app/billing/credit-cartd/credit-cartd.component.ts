import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { BillingService } from '../billing.service';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-credit-cartd',
  templateUrl: './credit-cartd.component.html',
  styleUrls: ['./credit-cartd.component.css']
})
export class CreditCartdComponent implements OnInit {

  billingService: BillingService;

  constructor(private authService: AuthService, private apiService: ApiService) { }

  ngOnInit() {
    this.billingService = new BillingService(this.apiService);
  }

  changeCreditCard() {
    const userProfile = this.authService.getUserProfile();

    this.billingService.setCreditCard({
      name: userProfile.nickname,
      email: userProfile.email,
      callback: () => {
        this.authService.updateUserProfile();
      }
    });

  }

}
