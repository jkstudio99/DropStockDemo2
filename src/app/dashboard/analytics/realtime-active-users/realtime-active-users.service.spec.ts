import { TestBed } from '@angular/core/testing';

import { RealtimeActiveUsersService } from './realtime-active-users.service';

describe('RealtimeActiveUsersService', () => {
  let service: RealtimeActiveUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeActiveUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
