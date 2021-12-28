import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vector4dComponent } from './drag-number-sides.component';

describe('DragNumberSidesComponent', () => {
  let component: Vector4dComponent;
  let fixture: ComponentFixture<Vector4dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Vector4dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Vector4dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
