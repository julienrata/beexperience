import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, NgClass, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() hideCloseButton = false;
  @Input() disableBackdropClose = false;
  @Input() showFooter = true;
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() confirmVariant: 'primary' | 'success' | 'danger' = 'primary';
  @Input() loading = false;
  
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();
  
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen && !this.disableBackdropClose) {
      this.close();
    }
  }
  
  get modalSizeClasses(): string {
    const sizeMap = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl'
    };
    
    return sizeMap[this.size] || sizeMap.md;
  }
  
  close(): void {
    this.closed.emit();
  }
  
  confirm(): void {
    this.confirmed.emit();
  }
  
  cancel(): void {
    this.canceled.emit();
  }
  
  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget && !this.disableBackdropClose) {
      this.close();
    }
  }
}
