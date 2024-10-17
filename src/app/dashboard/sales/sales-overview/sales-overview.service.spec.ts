import { TestBed } from '@angular/core/testing';

import { SalesOverviewService } from './sales-overview.service';

describe('SalesOverviewService', () => {
  let service: SalesOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
