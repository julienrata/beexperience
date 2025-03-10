import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" 
      [ngClass]="getVariantClasses()">
      <ng-content></ng-content>
    </span>
  `,
  styles: []
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' = 'default';
  
  getVariantClasses(): string {
    switch (this.variant) {
      case 'primary':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'danger':
        return 'bg-red-100 text-red-800';
      case 'info':
        return 'bg-purple-100 text-purple-800';
      case 'default':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}