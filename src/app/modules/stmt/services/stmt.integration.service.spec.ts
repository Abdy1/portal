import { TestBed } from '@angular/core/testing';

import { CitIntegrationService } from './stmt.integration.service';

describe('CitIntegrationService', () => {
  let service: CitIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
