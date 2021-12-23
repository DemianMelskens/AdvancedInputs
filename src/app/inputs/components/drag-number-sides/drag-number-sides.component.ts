import {Component, Input} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Consumer, Function} from "../../../shared/types/types";

@Component({
  selector: 'drag-number-sides',
  templateUrl: './drag-number-sides.component.html',
  styleUrls: ['./drag-number-sides.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DragNumberSidesComponent
    }
  ]
})
export class DragNumberSidesComponent implements ControlValueAccessor {
  @Input() step: number = 1;
  @Input() multiplier: number = 10;

  private form: FormGroup;
  disabled = false;
  touched = false;

  up: number = 0;
  right: number = 0;
  bottom: number = 0;
  left: number = 0;

  onChange: Consumer = (value: { up: number, right: number, bottom: number, left: number }) => {
  };

  onTouched: Function = () => {
  };

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      up: [{value: this.up, disabled: false}],
      right: [{value: this.right, disabled: false}],
      bottom: [{value: this.bottom, disabled: false}],
      left: [{value: this.left, disabled: false}]
    });

    this.form.valueChanges.subscribe(value => this.onChange(value));
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

  writeValue(value: { up: number, right: number, bottom: number, left: number }): void {
    this.form.setValue(value);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
