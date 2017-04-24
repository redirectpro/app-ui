import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCreditCardComponent } from './billing-credit-card.component';

describe('CreditCardComponent', () => {
  let component: BillingCreditCardComponent;
  let fixture: ComponentFixture<BillingCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingCreditCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
