import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showFirstLast = true;
  @Input() showPageNumbers = true;
  @Input() maxVisiblePages = 5;
  @Input() disabled = false;
  
  @Output() pageChange = new EventEmitter<number>();
  
  pages: number[] = [];
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages'] || changes['currentPage'] || changes['maxVisiblePages']) {
      this.buildPagination();
    }
  }
  
  buildPagination(): void {
    this.pages = [];
    
    if (this.totalPages <= this.maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      const halfVisible = Math.floor(this.maxVisiblePages / 2);
      let startPage = Math.max(this.currentPage - halfVisible, 1);
      let endPage = Math.min(startPage + this.maxVisiblePages - 1, this.totalPages);
      
      if (endPage - startPage + 1 < this.maxVisiblePages) {
        startPage = Math.max(endPage - this.maxVisiblePages + 1, 1);
      }
      
      // Add first page if not included
      if (startPage > 1) {
        this.pages.push(1);
        if (startPage > 2) {
          this.pages.push(-1); // Ellipsis
        }
      }
      
      // Add visible page numbers
      for (let i = startPage; i <= endPage; i++) {
        this.pages.push(i);
      }
      
      // Add last page if not included
      if (endPage < this.totalPages) {
        if (endPage < this.totalPages - 1) {
          this.pages.push(-1); // Ellipsis
        }
        this.pages.push(this.totalPages);
      }
    }
  }
  
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage || this.disabled) {
      return;
    }
    
    this.pageChange.emit(page);
  }
  
  get sizeClass(): string {
    return {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    }[this.size];
  }
  
  isEllipsis(page: number): boolean {
    return page === -1;
  }
}
