import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() type: AlertType = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = true;
  @Input() icon = true;
  @Input() outlined = false;
  
  @Output() dismissed = new EventEmitter<void>();
  
  get alertClasses(): string {
    const baseClasses = 'p-4 rounded-md';
    
    // Default solid backgrounds
    const solidColors = {
      success: 'bg-green-50 text-green-800',
      info: 'bg-blue-50 text-blue-800',
      warning: 'bg-yellow-50 text-yellow-800',
      error: 'bg-red-50 text-red-800'
    };
    
    // Outlined variant
    const outlinedColors = {
      success: 'bg-white border border-green-200 text-green-800',
      info: 'bg-white border border-blue-200 text-blue-800',
      warning: 'bg-white border border-yellow-200 text-yellow-800',
      error: 'bg-white border border-red-200 text-red-800'
    };
    
    const colorClasses = this.outlined 
      ? outlinedColors[this.type] 
      : solidColors[this.type];
    
    return `${baseClasses} ${colorClasses}`;
  }
  
  get iconPath(): string {
    switch (this.type) {
      case 'success':
        return 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z';
      case 'info':
        return 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
      case 'error':
        return 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z';
      default:
        return '';
    }
  }
  
  get iconColor(): string {
    const colors = {
      success: 'text-green-500',
      info: 'text-blue-500',
      warning: 'text-yellow-500',
      error: 'text-red-500'
    };
    
    return colors[this.type];
  }
  
  dismiss(): void {
    this.dismissed.emit();
  }
}
