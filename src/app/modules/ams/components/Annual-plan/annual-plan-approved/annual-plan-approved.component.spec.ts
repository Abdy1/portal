import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualPlanApprovedComponent } from './annual-plan-approved.component';

describe('AnnualPlanComponent', () => {
  let component: AnnualPlanApprovedComponent;
  let fixture: ComponentFixture<AnnualPlanApprovedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnualPlanApprovedComponent]
    });
    fixture = TestBed.createComponent(AnnualPlanApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
