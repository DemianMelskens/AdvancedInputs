import {Component, EventEmitter, Input, Output, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Consumer, Function} from "../../../shared/types/types";

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
export class NumberComponent implements ControlValueAccessor {
  @Input() step: number = 1;
  @Input() multiplier: number = 10;
  @Input() min!: number;
  @Input() max!: number;

  @Output() change = new EventEmitter<number>();

  value: number = 0;
  disabled = false;
  touched = false;

  onChange: Consumer = (_: number) => {
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
        let newValue = this.value + deltaStep;

        if (this.min) {
          newValue = Math.max(newValue, this.min);
        }

        if (this.max) {
          newValue = Math.min(newValue, this.max);
        }

        this.value = newValue;

        this.markAsChanged();
        event.target.blur();
        initialX = event.x;
      });
      const unListenMouseUp = this.renderer.listen('document', 'mouseup', () => {
        unListenMouseMove!();
        unListenMouseUp!();
      });
    }
  }

  registerOnChange(fn: Consumer): void {
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

  markAsChanged(): void {
    this.onChange(this.value);
    this.change.emit(this.value);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
