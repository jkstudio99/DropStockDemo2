import { TestBed } from '@angular/core/testing';

import { SyncingLineChartService } from './syncing-line-chart.service';

describe('SyncingLineChartService', () => {
  let service: SyncingLineChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncingLineChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
