import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="w-full">
      <label *ngIf="label" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      
      <div class="relative">
        <select
          [value]="value"
          [disabled]="disabled"
          [required]="required"
          [attr.aria-invalid]="error ? 'true' : 'false'"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
          [class.border-red-500]="error"
          (change)="onSelectChange($event)"
          (blur)="onTouched()"
        >
          <option *ngIf="placeholder" value="" disabled selected>{{ placeholder }}</option>
          <option *ngFor="let option of options" [value]="option.value" [disabled]="option.disabled">
            {{ option.label }}
          </option>
        </select>
      </div>
      
      <p *ngIf="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
      <p *ngIf="hint && !error" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
    </div>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {
  @Input() label: string | undefined;
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string | undefined;
  @Input() required = false;
  @Input() disabled = false;
  @Input() error: string | undefined;
  @Input() hint: string | undefined;
  
  value: string | number = '';
  
  onChange: any = () => {};
  onTouched: any = () => {};
  
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.value = selectElement.value;
    this.onChange(this.value);
  }
  
  writeValue(value: string | number): void {
    this.value = value !== undefined ? value : '';
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}