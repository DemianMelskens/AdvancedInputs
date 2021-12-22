import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragNumberComponent } from './drag-number.component';

describe('DragNumberComponent', () => {
  let component: DragNumberComponent;
  let fixture: ComponentFixture<DragNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
