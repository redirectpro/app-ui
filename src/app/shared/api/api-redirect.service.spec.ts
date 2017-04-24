import { TestBed, inject } from '@angular/core/testing';

import { ApiRedirectService } from './api-redirect.service';

describe('ApiRedirectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRedirectService]
    });
  });

  it('should ...', inject([ApiRedirectService], (service: ApiRedirectService) => {
    expect(service).toBeTruthy();
  }));
});
