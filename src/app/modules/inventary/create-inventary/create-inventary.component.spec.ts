import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventaryComponent } from './create-inventary.component';

describe('CreateInventaryComponent', () => {
  let component: CreateInventaryComponent;
  let fixture: ComponentFixture<CreateInventaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateInventaryComponent]
    });
    fixture = TestBed.createComponent(CreateInventaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
