import { TestBed } from '@angular/core/testing';

import { DatetimeAreaChartService } from './datetime-area-chart.service';

describe('DatetimeAreaChartService', () => {
  let service: DatetimeAreaChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatetimeAreaChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
