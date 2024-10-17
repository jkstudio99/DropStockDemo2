import { TestBed } from '@angular/core/testing';

import { SessionsByChannelService } from './sessions-by-channel.service';

describe('SessionsByChannelService', () => {
  let service: SessionsByChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionsByChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
