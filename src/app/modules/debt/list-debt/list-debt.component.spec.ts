import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDebtComponent } from './list-debt.component';

describe('ListDebtComponent', () => {
  let component: ListDebtComponent;
  let fixture: ComponentFixture<ListDebtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDebtComponent]
    });
    fixture = TestBed.createComponent(ListDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
