import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';

// Tab interface for content projection
export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab: string = '';
  @Input() variant: 'underline' | 'pills' | 'boxed' = 'underline';
  @Input() alignment: 'start' | 'center' | 'end' | 'full' = 'start';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() vertical = false;
  @Input() withIcons = false;

  @Output() tabChange = new EventEmitter<string>();

  setActiveTab(tabId: string): void {
    if (this.isDisabled(tabId)) {
      return;
    }

    this.activeTab = tabId;
    this.tabChange.emit(tabId);
  }

  isDisabled(tabId: string): boolean {
    const tab = this.tabs.find((t) => t.id === tabId);
    return !!tab?.disabled;
  }

  get alignmentClass(): string {
    return {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      full: 'w-full',
    }[this.alignment];
  }

  get tabItemClasses(): string {
    const sharedClasses = 'flex items-center';

    if (this.variant === 'underline') {
      return `${sharedClasses} px-1 py-4 border-b-2 font-medium text-sm focus:outline-none`;
    } else if (this.variant === 'pills') {
      return `${sharedClasses} px-3 py-2 rounded-md font-medium text-sm focus:outline-none`;
    } else {
      return `${sharedClasses} px-3 py-2 font-medium text-sm border-b border-r focus:outline-none last:border-r-0`;
    }
  }

  getTabStateClasses(tabId: string): string {
    const active = this.activeTab === tabId;
    const disabled = this.isDisabled(tabId);

    if (disabled) {
      return 'text-gray-400 cursor-not-allowed';
    }

    if (this.variant === 'underline') {
      return active
        ? 'border-indigo-500 text-indigo-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';
    } else if (this.variant === 'pills') {
      return active
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100';
    } else {
      return active
        ? 'bg-indigo-50 text-indigo-700 border-indigo-500'
        : 'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50';
    }
  }

  get tabSizeClass(): string {
    return {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    }[this.size];
  }

  get containerClasses(): string {
    return this.vertical ? 'flex' : '';
  }

  get tabListClasses(): string {
    if (this.vertical) {
      return 'flex flex-col space-y-1 border-r pr-1';
    }

    if (this.variant === 'boxed') {
      return `flex ${this.alignmentClass} border rounded-md overflow-hidden`;
    }

    return `flex ${this.alignmentClass} space-x-8 border-b`;
  }
}
