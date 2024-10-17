import { TestBed } from '@angular/core/testing';

import { GrossEarningsService } from './gross-earnings.service';

describe('GrossEarningsService', () => {
  let service: GrossEarningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrossEarningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
