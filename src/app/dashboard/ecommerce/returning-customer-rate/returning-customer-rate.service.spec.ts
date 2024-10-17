import { TestBed } from '@angular/core/testing';

import { ReturningCustomerRateService } from './returning-customer-rate.service';

describe('ReturningCustomerRateService', () => {
  let service: ReturningCustomerRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturningCustomerRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
