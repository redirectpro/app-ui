import { TestBed, inject } from '@angular/core/testing';

import { ApplicationRedirectService } from './application-redirect.service';

describe('ApplicationRedirectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationRedirectService]
    });
  });

  it('should ...', inject([ApplicationRedirectService], (service: ApplicationRedirectService) => {
    expect(service).toBeTruthy();
  }));
});
