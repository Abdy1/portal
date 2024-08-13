import { TestBed } from '@angular/core/testing';

import { ShiftService } from './shiftService';

describe('Analyst', () => {
  let service: ShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
