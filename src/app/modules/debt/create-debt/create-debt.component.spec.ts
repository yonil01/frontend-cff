import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDebtComponent } from './create-debt.component';

describe('CreateDebtComponent', () => {
  let component: CreateDebtComponent;
  let fixture: ComponentFixture<CreateDebtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDebtComponent]
    });
    fixture = TestBed.createComponent(CreateDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
