import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttendanceComponent } from './create-attendance.component';

describe('CreateAttendanceComponent', () => {
  let component: CreateAttendanceComponent;
  let fixture: ComponentFixture<CreateAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAttendanceComponent]
    });
    fixture = TestBed.createComponent(CreateAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
