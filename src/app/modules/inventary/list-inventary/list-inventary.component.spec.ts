import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInventaryComponent } from './list-inventary.component';

describe('ListInventaryComponent', () => {
  let component: ListInventaryComponent;
  let fixture: ComponentFixture<ListInventaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListInventaryComponent]
    });
    fixture = TestBed.createComponent(ListInventaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
