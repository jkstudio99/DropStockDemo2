import { TestBed } from '@angular/core/testing';

import { GithubStyleAreaChartService } from './github-style-area-chart.service';

describe('GithubStyleAreaChartService', () => {
  let service: GithubStyleAreaChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubStyleAreaChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
