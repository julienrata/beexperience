import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// UI Components
import { CardComponent, CardData } from '../../shared/ui-components/card/card.component';
import { TodoItemComponent, TodoItem } from '../../shared/ui-components/todo-item/todo-item.component';
import { ButtonComponent } from '../../shared/ui-components/button/button.component';
import { BadgeComponent } from '../../shared/ui-components/badge/badge.component';
import { AlertComponent } from '../../shared/ui-components/alert/alert.component';
import { ModalComponent } from '../../shared/ui-components/modal/modal.component';
import { PaginationComponent } from '../../shared/ui-components/pagination/pagination.component';
import { SearchBarComponent } from '../../shared/ui-components/search-bar/search-bar.component';
import { DataTableComponent, TableColumn } from '../../shared/ui-components/data-table/data-table.component';
import { TabsComponent, TabItem } from '../../shared/ui-components/tabs/tabs.component';
import { DropzoneComponent } from '../../shared/ui-components/dropzone/dropzone.component';
import { SkeletonLoaderComponent } from '../../shared/ui-components/skeleton-loader/skeleton-loader.component';
import { DynamicFormComponent, FormField } from '../../shared/ui-components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-styleguide',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    TodoItemComponent,
    ButtonComponent,
    BadgeComponent,
    AlertComponent,
    ModalComponent,
    PaginationComponent,
    SearchBarComponent,
    DataTableComponent,
    TabsComponent,
    DropzoneComponent,
    SkeletonLoaderComponent,
    DynamicFormComponent
  ],
  templateUrl: './styleguide.component.html',
  styleUrl: './styleguide.component.css'
})
export class StyleguideComponent {
  // Active tab for the styleguide sections
  activeSection = 'branding';

  // Modal demo
  isModalOpen = false;
  
  // Tabs demo
  sectionTabs: TabItem[] = [
    { id: 'branding', label: 'Logo & Branding' },
    { id: 'colors', label: 'Color Palette' },
    { id: 'typography', label: 'Typography' },
    { id: 'icons', label: 'Icons & Illustrations' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Cards' },
    { id: 'todos', label: 'Todo Items' },
    { id: 'badges', label: 'Badges' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'modals', label: 'Modals' },
    { id: 'pagination', label: 'Pagination' },
    { id: 'search', label: 'Search' },
    { id: 'tables', label: 'Data Tables' },
    { id: 'tabs', label: 'Tabs' },
    { id: 'dropzone', label: 'Dropzone' },
    { id: 'skeleton', label: 'Skeleton Loader' },
    { id: 'forms', label: 'Dynamic Forms' }
  ];
  
  // Cards demo
  demoCard: CardData = {
    id: 1,
    title: 'Getting Started with Angular 19',
    content: 'Learn about the latest features in Angular 19 and how to use them in your projects.',
    date: new Date(),
    tags: ['Angular', 'Web Development'],
    imageSrc: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1000'
  };
  
  // Todo item demo
  demoTodo: TodoItem = {
    id: 't1',
    title: 'Complete UI components',
    completed: false,
    priority: 'high',
    dueDate: new Date('2024-12-20'),
    description: 'Finish creating all the UI components for the application'
  };
  expandedTodo = false;
  
  // Tabs demo
  demoTabs: TabItem[] = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3', disabled: true }
  ];
  activeTab = 'tab1';
  
  // Dynamic Form demo
  formFields: FormField[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      placeholder: 'Enter your name',
      validators: {
        minLength: 3,
        maxLength: 50
      }
    },
    {
      key: 'email',
      label: 'Email',
      type: 'text',
      required: true,
      placeholder: 'Enter your email',
      validators: {
        email: true
      }
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number',
      required: false,
      validators: {
        min: 18,
        max: 100
      }
    },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'technology', label: 'Technology' },
        { value: 'health', label: 'Health & Fitness' },
        { value: 'finance', label: 'Finance' }
      ]
    },
    {
      key: 'subscribe',
      label: 'Subscribe to newsletter',
      type: 'checkbox',
      defaultValue: true
    }
  ];
  
  // Table demo
  tableColumns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px', align: 'center' },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'status', label: 'Status', sortable: true, type: 'badge', align: 'center', width: '120px',
      badgeMap: {
        'published': { label: 'Published', variant: 'success' },
        'draft': { label: 'Draft', variant: 'warning' },
        'archived': { label: 'Archived', variant: 'danger' }
      }
    },
    { key: 'date', label: 'Date', sortable: true, type: 'date', width: '150px' }
  ];
  
  tableData = [
    { id: 1, title: 'Getting Started with Angular', status: 'published', date: new Date('2023-12-01') },
    { id: 2, title: 'Advanced TypeScript Tips', status: 'draft', date: new Date('2023-12-05') },
    { id: 3, title: 'Tailwind CSS Best Practices', status: 'published', date: new Date('2023-12-10') },
    { id: 4, title: 'State Management in Angular', status: 'archived', date: new Date('2023-11-20') }
  ];
  
  tableActions: { 
    type: string; 
    label: string; 
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' 
  }[] = [
    { type: 'edit', label: 'Edit', variant: 'primary' },
    { type: 'delete', label: 'Delete', variant: 'danger' }
  ];
  
  // Pagination demo
  currentPage = 1;
  
  constructor() {}
  
  onSectionChange(tabId: string): void {
    this.activeSection = tabId;
  }
  
  toggleTodoExpand(): void {
    this.expandedTodo = !this.expandedTodo;
  }
  
  handleSearch(term: string): void {
    console.log('Search term:', term);
  }
  
  handleClear(): void {
    console.log('Search cleared');
  }
  
  onFilesChanged(event: any): void {
    console.log('Files changed:', event);
  }
  
  onUploadFiles(files: File[]): void {
    console.log('Upload files:', files);
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
  }
  
  onTableAction(event: any): void {
    console.log('Table action:', event);
  }
  
  onFormSubmit(data: any): void {
    console.log('Form submitted:', data);
  }

  getCompletedTodo(): TodoItem {
    return {
      ...this.demoTodo,
      completed: true
    };
  }
  
  getMediumPriorityTodo(): TodoItem {
    return {
      ...this.demoTodo,
      priority: 'medium'
    };
  }
  
  getLowPriorityTodo(): TodoItem {
    return {
      ...this.demoTodo,
      priority: 'low'
    };
  }
}
