import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttendaceComponent } from './list-attendace.component';

describe('ListAttendaceComponent', () => {
  let component: ListAttendaceComponent;
  let fixture: ComponentFixture<ListAttendaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAttendaceComponent]
    });
    fixture = TestBed.createComponent(ListAttendaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
