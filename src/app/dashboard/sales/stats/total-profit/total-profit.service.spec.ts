import { TestBed } from '@angular/core/testing';

import { TotalProfitService } from './total-profit.service';

describe('TotalProfitService', () => {
  let service: TotalProfitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalProfitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
