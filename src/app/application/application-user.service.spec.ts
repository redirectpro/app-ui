import { TestBed, inject } from '@angular/core/testing';

import { ApplicationUserService } from './application-user.service';

describe('ApplicationUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationUserService]
    });
  });

  it('should ...', inject([ApplicationUserService], (service: ApplicationUserService) => {
    expect(service).toBeTruthy();
  }));
});
