import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: { value: string | number | boolean; label: string }[];
  defaultValue?: any;
  validators?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    email?: boolean;
  };
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass, NgFor, NgIf],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.css'
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() formTitle = 'Form';
  @Input() submitLabel = 'Submit';
  @Input() cancelLabel = 'Cancel';
  @Input() initialValues: Record<string, any> = {};
  @Input() loading = false;
  
  @Output() formSubmit = new EventEmitter<Record<string, any>>();
  @Output() formCancel = new EventEmitter<void>();
  
  form!: FormGroup;
  submitted = false;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.createForm();
  }
  
  createForm(): void {
    const formControls: Record<string, any> = {};
    
    this.fields.forEach(field => {
      // Determine validators
      const validatorsList: any[] = [];
      if (field.required) {
        validatorsList.push(Validators.required);
      }
      
      if (field.validators) {
        if (field.validators.minLength) {
          validatorsList.push(Validators.minLength(field.validators.minLength));
        }
        if (field.validators.maxLength) {
          validatorsList.push(Validators.maxLength(field.validators.maxLength));
        }
        if (field.validators.min) {
          validatorsList.push(Validators.min(field.validators.min));
        }
        if (field.validators.max) {
          validatorsList.push(Validators.max(field.validators.max));
        }
        if (field.validators.pattern) {
          validatorsList.push(Validators.pattern(field.validators.pattern));
        }
        if (field.validators.email) {
          validatorsList.push(Validators.email);
        }
      }
      
      // Set initial value from provided initialValues or field default
      const initialValue = this.initialValues[field.key] !== undefined 
        ? this.initialValues[field.key] 
        : field.defaultValue;
      
      formControls[field.key] = [initialValue, validatorsList];
    });
    
    this.form = this.fb.group(formControls);
  }
  
  onSubmit(): void {
    this.submitted = true;
    
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }
  
  onCancel(): void {
    this.formCancel.emit();
  }
  
  hasError(fieldName: string, errorType: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched || this.submitted));
  }
  
  getErrorMessage(fieldName: string): string {
    const field = this.fields.find(f => f.key === fieldName);
    const control = this.form.get(fieldName);
    
    if (!field || !control || !control.errors) {
      return '';
    }
    
    if (control.hasError('required')) {
      return `${field.label} is required`;
    }
    
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    
    if (control.hasError('minlength')) {
      return `Minimum length is ${field.validators?.minLength} characters`;
    }
    
    if (control.hasError('maxlength')) {
      return `Maximum length is ${field.validators?.maxLength} characters`;
    }
    
    if (control.hasError('min')) {
      return `Minimum value is ${field.validators?.min}`;
    }
    
    if (control.hasError('max')) {
      return `Maximum value is ${field.validators?.max}`;
    }
    
    if (control.hasError('pattern')) {
      return `Invalid format`;
    }
    
    return 'Invalid value';
  }
}
