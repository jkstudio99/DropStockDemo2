import { TestBed } from '@angular/core/testing';

import { NewRegistersService } from './new-registers.service';

describe('NewRegistersService', () => {
  let service: NewRegistersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRegistersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
