import {Component, Input, Renderer2} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Consumer, Function} from "../../../shared/types/types";

@Component({
  selector: 'drag-number',
  templateUrl: './drag-number.component.html',
  styleUrls: ['./drag-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DragNumberComponent
    }
  ]
})
export class DragNumberComponent implements ControlValueAccessor {
  @Input() step: number = 1;
  @Input() multiplier: number = 10;

  value: number = 0;
  disabled = false;
  touched = false;

  onChange: Consumer = (value: number) => {
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
        const delta = (event.x - initialX)
        this.writeValue(this.value + (delta * stepSize));
        this.onChange(this.value);
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

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
