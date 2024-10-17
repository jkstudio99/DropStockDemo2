import { TestBed } from '@angular/core/testing';

import { WebsiteVisitsService } from './website-visits.service';

describe('WebsiteVisitsService', () => {
  let service: WebsiteVisitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteVisitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
