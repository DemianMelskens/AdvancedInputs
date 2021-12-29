import {Component, EventEmitter, Input, Output, Renderer2} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Consumer, Function, Vector2D, VectorType2d} from "../../../shared/types/types";
import {CustomControlValueAccessor} from "../custom-control-value-accessor";

@Component({
  selector: 'input-vector2d',
  templateUrl: './vector2d.component.html',
  styleUrls: ['./vector2d.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: Vector2dComponent
    }
  ]
})
export class Vector2dComponent implements CustomControlValueAccessor<Vector2D> {
  @Input() step: number = 1;
  @Input() multiplier: number = 10;

  @Output() change = new EventEmitter<Vector2D>();

  value: Vector2D = {x: 0, y: 0};
  disabled = false;
  touched = false;

  onChange: Consumer<Vector2D> = (_: Vector2D) => {
  };

  onTouched: Function = () => {
  };

  constructor(private renderer: Renderer2) {
  }

  startDrag(event: MouseEvent, type: VectorType2d): void {
    let initialX = event.x;
    this.markAsTouched();
    if (!this.disabled) {
      const unListenMouseMove = this.renderer.listen('document', 'mousemove', event => {
        const stepSize = event.shiftKey ? (this.step * this.multiplier) : this.step;
        const deltaStep = (event.x - initialX) * stepSize
        this.value[type] = this.value[type] + deltaStep;

        this.markAsChanged(this.value);
        initialX = event.x;
      });
      const unListenMouseUp = this.renderer.listen('document', 'mouseup', () => {
        unListenMouseMove!();
        unListenMouseUp!();
      });
    }
  }

  registerOnChange(fn: Consumer<Vector2D>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: Vector2D): void {
    this.value = value;
  }

  markAsChanged(value: Vector2D): void {
    this.onChange(value);
    this.change.emit(value);
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
