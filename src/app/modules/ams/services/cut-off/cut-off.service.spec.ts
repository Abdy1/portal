import { TestBed } from '@angular/core/testing';

import { cutoffService } from './cut-off.service';

describe('AnnualPlanService', () => {
  let service: cutoffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(cutoffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
