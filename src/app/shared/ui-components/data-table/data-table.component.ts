import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'badge' | 'image' | 'actions';
  width?: string;
  align?: 'left' | 'center' | 'right';
  format?: (value: any) => string;
  badgeMap?: Record<string, { label: string; variant: string }>;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

export interface ActionEvent {
  type: string;
  item: any;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgClass, NgFor, NgIf, ButtonComponent],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() striped = true;
  @Input() hoverable = true;
  @Input() bordered = false;
  @Input() responsive = true;
  @Input() pageSize = 10;
  @Input() showPagination = false;
  @Input() actions: { type: string; label: string; icon?: string; variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' }[] = [];
  
  @Output() rowClick = new EventEmitter<any>();
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() action = new EventEmitter<ActionEvent>();
  
  currentPage = 1;
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  
  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }
  
  get paginationArray(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }
  
  get paginatedData(): any[] {
    if (!this.showPagination) {
      return this.data;
    }
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(startIndex, startIndex + this.pageSize);
  }
  
  onSort(column: TableColumn): void {
    if (!column.sortable) {
      return;
    }
    
    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }
    
    this.sort.emit({
      column: this.sortColumn,
      direction: this.sortDirection
    });
  }
  
  onRowClick(item: any): void {
    this.rowClick.emit(item);
  }
  
  onAction(actionType: string, item: any): void {
    this.action.emit({
      type: actionType,
      item
    });
  }
  
  changePage(page: number): void {
    this.currentPage = page;
  }
  
  getSortIcon(column: TableColumn): string {
    if (!column.sortable) {
      return '';
    }
    
    if (this.sortColumn !== column.key) {
      return 'sort';
    }
    
    return this.sortDirection === 'asc' ? 'sort-up' : 'sort-down';
  }
  
  getCellAlignment(column: TableColumn): string {
    const alignment = column.align || 'left';
    
    return {
      'left': 'text-left',
      'center': 'text-center',
      'right': 'text-right'
    }[alignment];
  }
  
  formatCellValue(column: TableColumn, value: any): string {
    if (value === undefined || value === null) {
      return '';
    }
    
    if (column.format) {
      return column.format(value);
    }
    
    switch (column.type) {
      case 'date':
        return new Date(value).toLocaleDateString();
      case 'boolean':
        return value ? 'Yes' : 'No';
      default:
        return String(value);
    }
  }
  
  getLastItemIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.data.length);
  }
}
