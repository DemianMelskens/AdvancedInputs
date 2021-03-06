import {Component, EventEmitter, Input, Output, Renderer2} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Consumer, Function, Vector3D, VectorType3d} from "../../../shared/types/types";
import {CustomControlValueAccessor} from "../custom-control-value-accessor";

@Component({
  selector: 'input-vector3d',
  templateUrl: './vector3d.component.html',
  styleUrls: ['./vector3d.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: Vector3dComponent
    }
  ]
})
export class Vector3dComponent implements CustomControlValueAccessor<Vector3D> {
  @Input() step: number = 1;
  @Input() multiplier: number = 10;

  @Output() change = new EventEmitter<Vector3D>();

  value: Vector3D = {x: 0, y: 0, z: 0};
  disabled = false;
  touched = false;

  onChange: Consumer<Vector3D> = (_: Vector3D) => {
  };

  onTouched: Function = () => {
  };

  constructor(private renderer: Renderer2) {
  }

  startDrag(event: MouseEvent, type: VectorType3d): void {
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

  registerOnChange(fn: Consumer<Vector3D>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: Vector3D): void {
    this.value = value;
  }

  markAsChanged(value: Vector3D): void {
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
