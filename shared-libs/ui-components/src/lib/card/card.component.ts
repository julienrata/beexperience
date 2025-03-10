import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden" [class]="padding ? 'p-6' : ''">
      <div *ngIf="title || subtitle" class="mb-4">
        <h3 *ngIf="title" class="text-xl font-semibold text-gray-900">{{ title }}</h3>
        <p *ngIf="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
      </div>
      
      <ng-content></ng-content>
      
      <div *ngIf="footerTemplate" class="mt-6 pt-4 border-t border-gray-200">
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </div>
    </div>
  `,
  styles: []
})
export class CardComponent {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() padding = true;
  @Input() footerTemplate: any;
}