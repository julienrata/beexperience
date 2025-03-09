import { Component, Input } from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';

export type SkeletonType = 'text' | 'circle' | 'rectangle' | 'card' | 'table' | 'list' | 'avatar' | 'image';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.css'
})
export class SkeletonLoaderComponent {
  @Input() type: SkeletonType = 'text';
  @Input() count = 1;
  @Input() width?: string;
  @Input() height?: string;
  @Input() rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
  @Input() animation: 'pulse' | 'wave' | 'none' = 'pulse';
  @Input() showContent = false; // For use as a wrapper component
  @Input() aspectRatio?: 'square' | 'video' | '16/9' | '4/3' | '1/1';
  
  // Card skeleton specific inputs
  @Input() cardHasImage = true;
  @Input() cardLines = 3;
  
  // Table skeleton specific inputs
  @Input() tableRows = 5;
  @Input() tableCols = 4;
  
  // List skeleton specific inputs
  @Input() listItems = 4;
  @Input() listHasImage = true;
  
  get animationClass(): string {
    return {
      'pulse': 'animate-pulse',
      'wave': 'skeleton-wave',
      'none': ''
    }[this.animation];
  }
  
  get roundedClass(): string {
    return {
      'none': 'rounded-none',
      'sm': 'rounded-sm',
      'md': 'rounded',
      'lg': 'rounded-lg',
      'full': 'rounded-full'
    }[this.rounded];
  }
  
  get aspectRatioClass(): string | undefined {
    if (!this.aspectRatio) return undefined;
    
    return {
      'square': 'aspect-square',
      'video': 'aspect-video',
      '16/9': 'aspect-[16/9]',
      '4/3': 'aspect-[4/3]',
      '1/1': 'aspect-square'
    }[this.aspectRatio];
  }
  
  generateArray(count: number): number[] {
    return Array(count).fill(0).map((_, i) => i);
  }
}
