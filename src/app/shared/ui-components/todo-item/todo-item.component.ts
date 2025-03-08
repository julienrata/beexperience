import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TodoItem {
  id: string | number;
  title: string;
  completed: boolean;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  description?: string;
}

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgClass, DatePipe, FormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: TodoItem;
  @Input() loading = false;
  @Input() expanded = false;
  
  @Output() statusChange = new EventEmitter<TodoItem>();
  @Output() editTodo = new EventEmitter<TodoItem>();
  @Output() deleteTodo = new EventEmitter<TodoItem>();
  @Output() toggleExpand = new EventEmitter<void>();
  
  priorityClasses = {
    'low': 'bg-blue-100 text-blue-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-red-100 text-red-800'
  };
  
  onStatusChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.todo.completed = checkbox.checked;
    this.statusChange.emit(this.todo);
  }
  
  onEdit(): void {
    this.editTodo.emit(this.todo);
  }
  
  onDelete(): void {
    this.deleteTodo.emit(this.todo);
  }
  
  onToggleExpand(): void {
    this.toggleExpand.emit();
  }
}
