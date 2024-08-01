import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeStmt } from './oneTimeStmt.component';

describe('UploadComponent', () => {
  let component: OneTimeStmt;
  let fixture: ComponentFixture<OneTimeStmt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimeStmt ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneTimeStmt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
