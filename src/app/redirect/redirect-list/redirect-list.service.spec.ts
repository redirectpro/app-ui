import { TestBed, inject } from '@angular/core/testing';

import { RedirectListService } from './redirect-list.service';

describe('RedirectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectListService]
    });
  });

  it('should ...', inject([RedirectListService], (service: RedirectListService) => {
    expect(service).toBeTruthy();
  }));
});
