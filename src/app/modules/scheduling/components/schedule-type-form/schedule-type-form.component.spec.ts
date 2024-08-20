import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTypeFormComponent } from './schedule-type-form.component';

describe('ScheduleTypeFormComponent', () => {
  let component: ScheduleTypeFormComponent;
  let fixture: ComponentFixture<ScheduleTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
