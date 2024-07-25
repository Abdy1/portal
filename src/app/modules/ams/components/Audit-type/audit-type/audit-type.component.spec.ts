import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditTypeComponent } from './audit-type.component';

describe('AuditStaffComponent', () => {
  let component: AuditTypeComponent;
  let fixture: ComponentFixture<AuditTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditTypeComponent]
    });
    fixture = TestBed.createComponent(AuditTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
