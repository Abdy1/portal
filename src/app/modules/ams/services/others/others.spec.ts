import { TestBed } from '@angular/core/testing';

import { OtherServices } from './other.service';

describe('OtherService', () => {
  let service: OtherServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
