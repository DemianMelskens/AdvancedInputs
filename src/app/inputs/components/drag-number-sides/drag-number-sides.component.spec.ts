import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragNumberSidesComponent } from './drag-number-sides.component';

describe('DragNumberSidesComponent', () => {
  let component: DragNumberSidesComponent;
  let fixture: ComponentFixture<DragNumberSidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragNumberSidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragNumberSidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
