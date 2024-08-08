import { TestBed } from '@angular/core/testing';

import { StmtIntegrationService } from './stmt.integration.service';

describe('CitIntegrationService', () => {
  let service: StmtIntegrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StmtIntegrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
