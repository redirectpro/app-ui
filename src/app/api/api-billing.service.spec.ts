import { TestBed, inject } from '@angular/core/testing';

import { ApiBillingService } from './api-billing.service';

describe('ApiBillingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiBillingService]
    });
  });

  it('should ...', inject([ApiBillingService], (service: ApiBillingService) => {
    expect(service).toBeTruthy();
  }));
});
