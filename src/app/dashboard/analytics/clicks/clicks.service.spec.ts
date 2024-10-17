import { TestBed } from '@angular/core/testing';

import { ClicksService } from './clicks.service';

describe('ClicksService', () => {
  let service: ClicksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClicksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
