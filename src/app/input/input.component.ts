import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputErrorStateMatcher } from './input-error-matcher';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';

  @Input() type: string = 'text';

  @Input() id: string = Math.random().toString();

  @Input() set invalidForm(invalidForm: boolean | null) {
    if (invalidForm != null)
      this.errorState = new InputErrorStateMatcher(invalidForm);
  }

  inputValue = null;

  errorState: InputErrorStateMatcher = new InputErrorStateMatcher(false);

  onChange = (value: any) => {};

  onTouched = (value: any) => {};

  constructor() {}

  writeValue(obj: any): void {
    this.inputValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {}
}
