import { TestBed } from '@angular/core/testing';

import { RealTimeSalesService } from './real-time-sales.service';

describe('RealTimeSalesService', () => {
  let service: RealTimeSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealTimeSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
