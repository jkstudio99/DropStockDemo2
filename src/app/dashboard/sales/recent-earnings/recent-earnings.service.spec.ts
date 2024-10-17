import { TestBed } from '@angular/core/testing';

import { RecentEarningsService } from './recent-earnings.service';

describe('RecentEarningsService', () => {
  let service: RecentEarningsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentEarningsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
