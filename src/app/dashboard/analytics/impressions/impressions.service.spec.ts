import { TestBed } from '@angular/core/testing';

import { ImpressionsService } from './impressions.service';

describe('ImpressionsService', () => {
  let service: ImpressionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpressionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
