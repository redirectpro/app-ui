import { TestBed, inject } from '@angular/core/testing';

import { BillingService } from './billing.service';

describe('BillingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillingService]
    });
  });

  it('should ...', inject([BillingService], (service: BillingService) => {
    expect(service).toBeTruthy();
  }));
});
