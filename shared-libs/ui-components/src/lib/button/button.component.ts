import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="inline-flex items-center justify-center rounded-md font-medium transition-colors"
      [class]="getButtonClasses()"
      [disabled]="disabled"
      (click)="onClick.emit($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() fullWidth = false;
  
  @Output() onClick = new EventEmitter<MouseEvent>();
  
  getButtonClasses(): string {
    const classes = [];
    
    // Variant classes
    if (this.variant === 'primary') {
      classes.push('bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2');
    } else if (this.variant === 'secondary') {
      classes.push('bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2');
    } else if (this.variant === 'outline') {
      classes.push('bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2');
    } else if (this.variant === 'danger') {
      classes.push('bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2');
    }
    
    // Size classes
    if (this.size === 'sm') {
      classes.push('text-sm px-3 py-1.5');
    } else if (this.size === 'md') {
      classes.push('text-base px-4 py-2');
    } else if (this.size === 'lg') {
      classes.push('text-lg px-6 py-3');
    }
    
    // Width class
    if (this.fullWidth) {
      classes.push('w-full');
    }
    
    // Disabled class
    if (this.disabled) {
      classes.push('opacity-50 cursor-not-allowed');
    }
    
    return classes.join(' ');
  }
}