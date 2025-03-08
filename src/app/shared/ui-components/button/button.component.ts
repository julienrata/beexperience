import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() icon?: string;
  @Input() loading = false;
  @Input() ariaLabel?: string;
  
  @Output() buttonClick = new EventEmitter<MouseEvent>();
  
  get variantClasses(): string {
    const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center transition-colors';
    
    const sizeClasses = {
      sm: 'text-xs px-2 py-1 shadow-sm',
      md: 'text-sm px-4 py-2 shadow-sm',
      lg: 'text-base px-6 py-3 shadow'
    }[this.size];
    
    const variantClasses = {
      primary: 'bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent focus:ring-indigo-500',
      secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 focus:ring-indigo-500',
      success: 'bg-green-600 hover:bg-green-700 text-white border border-transparent focus:ring-green-500',
      danger: 'bg-red-600 hover:bg-red-700 text-white border border-transparent focus:ring-red-500',
      warning: 'bg-yellow-500 hover:bg-yellow-600 text-white border border-transparent focus:ring-yellow-500',
      info: 'bg-blue-500 hover:bg-blue-600 text-white border border-transparent focus:ring-blue-500',
      light: 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 focus:ring-gray-500',
      dark: 'bg-gray-800 hover:bg-gray-900 text-white border border-transparent focus:ring-gray-700'
    }[this.variant];
    
    const widthClass = this.fullWidth ? 'w-full' : '';
    
    return `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass}`;
  }
  
  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }
}
