import {Component, EventEmitter, Input, Output, Renderer2} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Consumer, Function, Vector4D, VectorType4d} from "../../../shared/types/types";
import {CustomControlValueAccessor} from "../custom-control-value-accessor";

@Component({
  selector: 'input-vector4d',
  templateUrl: './vector4d.component.html',
  styleUrls: ['./vector4d.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: Vector4dComponent
    }
  ]
})
export class Vector4dComponent implements CustomControlValueAccessor<Vector4D> {
  @Input() step: number = 1;
  @Input() multiplier: number = 10;

  @Output() change = new EventEmitter<Vector4D>();

  value: Vector4D = {x: 0, y: 0, z: 0, w: 0};
  disabled = false;
  touched = false;

  onChange: Consumer<Vector4D> = (_: Vector4D) => {
  };

  onTouched: Function = () => {
  };

  constructor(private renderer: Renderer2) {
  }

  startDrag(event: MouseEvent, type: VectorType4d): void {
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

  registerOnChange(fn: Consumer<Vector4D>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: Vector4D): void {
    this.value = value;
  }

  markAsChanged(value: Vector4D): void {
    this.onChange(value);
    this.change.emit(value);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
