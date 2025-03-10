import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="fixed inset-0 z-50 overflow-y-auto" (click)="onBackdropClick($event)">
      <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- Modal panel -->
        <div 
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          [class.sm:max-w-md]="size === 'sm'"
          [class.sm:max-w-lg]="size === 'md'"
          [class.sm:max-w-2xl]="size === 'lg'"
          [class.sm:max-w-4xl]="size === 'xl'"
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="modal-headline"
        >
          <!-- Header -->
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 *ngIf="title" class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  {{ title }}
                </h3>
                
                <div class="mt-2">
                  <ng-content></ng-content>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div *ngIf="showFooter" class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              *ngIf="primaryButtonText"
              type="button" 
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              (click)="onPrimaryClick.emit()">
              {{ primaryButtonText }}
            </button>
            
            <button 
              *ngIf="secondaryButtonText"
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              (click)="onSecondaryClick.emit()">
              {{ secondaryButtonText }}
            </button>
            
            <button 
              *ngIf="cancelButtonText"
              type="button" 
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
              (click)="onClose.emit()">
              {{ cancelButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title: string | undefined;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() primaryButtonText: string | undefined;
  @Input() secondaryButtonText: string | undefined;
  @Input() cancelButtonText = 'Cancel';
  @Input() showFooter = true;
  @Input() closeOnBackdropClick = true;
  
  @Output() onClose = new EventEmitter<void>();
  @Output() onPrimaryClick = new EventEmitter<void>();
  @Output() onSecondaryClick = new EventEmitter<void>();
  
  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const modalContent = target.closest('[role="dialog"]');
    
    if (this.closeOnBackdropClick && !modalContent) {
      this.onClose.emit();
    }
  }
}