import {Component, EventEmitter, Input, Output, Renderer2} from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Consumer, Function} from "../../../shared/types/types";
import {CustomControlValueAccessor} from "../custom-control-value-accessor";

@Component({
  selector: 'input-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NumberComponent
    }
  ]
})
export class NumberComponent implements CustomControlValueAccessor<number> {
  @Input() step: number = 1;
  @Input() multiplier: number = 10;
  @Input() min!: number;
  @Input() max!: number;

  @Output() change = new EventEmitter<number>();

  value: number = 0;
  disabled = false;
  touched = false;

  onChange: Consumer<number> = (_: number) => {
  };
  onTouched: Function = () => {
  };

  constructor(private renderer: Renderer2) {
  }

  startDrag(event: MouseEvent): void {
    let initialX = event.x;
    this.markAsTouched();
    if (!this.disabled) {
      const unListenMouseMove = this.renderer.listen('document', 'mousemove', event => {
        const stepSize = event.shiftKey ? (this.step * this.multiplier) : this.step;
        const deltaStep = (event.x - initialX) * stepSize

        this.markAsChanged(this.value + deltaStep);
        event.target.blur();
        initialX = event.x;
      });
      const unListenMouseUp = this.renderer.listen('document', 'mouseup', () => {
        unListenMouseMove!();
        unListenMouseUp!();
      });
    }
  }

  registerOnChange(fn: Consumer<number>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: number): void {
    this.value = value;
  }

  markAsChanged(value: number): void {
    value = this.min != undefined ? Math.max(value, this.min) : value;
    value = this.max != undefined ? Math.min(value, this.max) : value;
    this.value = value;

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
