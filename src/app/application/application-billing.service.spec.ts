import { TestBed, inject } from '@angular/core/testing';

import { ApplicationBillingService } from './application-billing.service';

describe('ApplicationBillingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationBillingService]
    });
  });

  it('should ...', inject([ApplicationBillingService], (service: ApplicationBillingService) => {
    expect(service).toBeTruthy();
  }));
});
