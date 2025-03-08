import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder = 'Search...';
  @Input() initialValue = '';
  @Input() debounceTime = 300;
  @Input() minChars = 2;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() rounded = true;
  @Input() withButton = false;
  @Input() buttonText = 'Search';
  @Input() withIcon = true;
  @Input() loading = false;
  
  @Output() search = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();
  
  searchControl = new FormControl('');
  showClearButton = false;
  
  ngOnInit(): void {
    if (this.initialValue) {
      this.searchControl.setValue(this.initialValue);
      this.showClearButton = true;
    }
    
    this.searchControl.valueChanges
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged()
      )
      .subscribe(value => {
        const searchValue = value || '';
        this.showClearButton = searchValue.length > 0;
        
        if (searchValue.length >= this.minChars || searchValue.length === 0) {
          this.search.emit(searchValue);
        }
      });
  }
  
  clearSearch(): void {
    this.searchControl.setValue('');
    this.showClearButton = false;
    this.clear.emit();
  }
  
  onSubmit(event: Event): void {
    event.preventDefault();
    const value = this.searchControl.value || '';
    if (value.length >= this.minChars || value.length === 0) {
      this.search.emit(value);
    }
  }
  
  get sizeClasses(): string {
    return {
      'sm': 'px-3 py-1.5 text-xs',
      'md': 'px-4 py-2 text-sm',
      'lg': 'px-5 py-3 text-base'
    }[this.size];
  }
  
  get buttonSizeClasses(): string {
    return {
      'sm': 'px-2.5 py-1.5 text-xs',
      'md': 'px-4 py-2 text-sm',
      'lg': 'px-5 py-3 text-base'
    }[this.size];
  }
  
  get roundedClasses(): string {
    return this.rounded ? 'rounded-full' : 'rounded-md';
  }
}
