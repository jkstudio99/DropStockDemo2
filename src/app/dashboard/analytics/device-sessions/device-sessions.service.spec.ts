import { TestBed } from '@angular/core/testing';

import { DeviceSessionsService } from './device-sessions.service';

describe('DeviceSessionsService', () => {
  let service: DeviceSessionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceSessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
