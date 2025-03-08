import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css'
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';
  @Input() size: BadgeSize = 'md';
  @Input() rounded = false;
  @Input() outlined = false;
  
  get badgeClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-medium';
    
    const sizeClasses = {
      sm: 'text-xs px-1.5 py-0.5',
      md: 'text-xs px-2.5 py-1',
      lg: 'text-sm px-3 py-1.5'
    }[this.size];
    
    // Default solid colors
    const variantColors = {
      primary: 'bg-indigo-100 text-indigo-800',
      secondary: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      danger: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800'
    };
    
    // Outlined variant
    const outlinedColors = {
      primary: 'bg-white text-indigo-600 border border-indigo-200',
      secondary: 'bg-white text-gray-600 border border-gray-200',
      success: 'bg-white text-green-600 border border-green-200',
      danger: 'bg-white text-red-600 border border-red-200',
      warning: 'bg-white text-yellow-600 border border-yellow-200',
      info: 'bg-white text-blue-600 border border-blue-200'
    };
    
    const variantClasses = this.outlined 
      ? outlinedColors[this.variant] 
      : variantColors[this.variant];
    
    const roundedClass = this.rounded ? 'rounded-full' : 'rounded';
    
    return `${baseClasses} ${sizeClasses} ${variantClasses} ${roundedClass}`;
  }
}
