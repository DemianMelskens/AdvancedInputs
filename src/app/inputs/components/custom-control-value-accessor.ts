import {Consumer, Function} from "../../shared/types/types";
import {ControlValueAccessor} from "@angular/forms";

export interface CustomControlValueAccessor<T> extends ControlValueAccessor {
  value: T;
  disabled: boolean;
  touched: boolean;

  onChange: Consumer<T>;
  onTouched: Function;

  registerOnChange(fn: Consumer<T>): void;

  registerOnTouched(fn: Function): void;

  setDisabledState(isDisabled: boolean): void;

  writeValue(value: T): void;

  markAsChanged(value: T): void;

  markAsTouched(): void;
}
