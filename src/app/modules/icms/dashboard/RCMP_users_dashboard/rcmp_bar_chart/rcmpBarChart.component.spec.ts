import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RCMPBarChartComponent } from './rcmpBarChart.component';

describe('RCMPBarChartComponent', () => {
  let component: RCMPBarChartComponent;
  let fixture: ComponentFixture<RCMPBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RCMPBarChartComponent]
    });
    fixture = TestBed.createComponent(RCMPBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
