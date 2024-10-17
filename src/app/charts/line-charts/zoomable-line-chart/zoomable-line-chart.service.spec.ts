import { TestBed } from '@angular/core/testing';

import { ZoomableLineChartService } from './zoomable-line-chart.service';

describe('ZoomableLineChartService', () => {
  let service: ZoomableLineChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomableLineChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
