import { TestBed } from '@angular/core/testing';

import { AnalyticsOverviewService } from './analytics-overview.service';

describe('AnalyticsOverviewService', () => {
  let service: AnalyticsOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
