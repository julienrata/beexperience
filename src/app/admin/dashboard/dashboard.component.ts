import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgIf, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  CardComponent,
  CardData,
} from '../../shared/ui-components/card/card.component';
import {
  TodoItemComponent,
  TodoItem,
} from '../../shared/ui-components/todo-item/todo-item.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DatePipe, RouterLink, CardComponent, TodoItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  activeTab: 'overview' | 'blogs' | 'todos' = 'overview';

  // Dashboard stats
  stats = {
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalTodos: 0,
    completedTodos: 0,
    pendingTodos: 0,
  };

  // Recent activity
  recentActivity: {
    type: 'blog' | 'todo';
    action: string;
    item: string;
    date: Date;
  }[] = [];

  // Blog posts
  blogPosts: CardData[] = [];
  blogLoading = true;

  // Todo items
  todoItems: TodoItem[] = [];
  todoLoading = true;
  expandedTodoIds: Set<string | number> = new Set();

  constructor() {}

  ngOnInit(): void {
    // Simulate API calls to get data
    setTimeout(() => {
      this.loadMockData();
      this.blogLoading = false;
      this.todoLoading = false;
    }, 1000);
  }

  loadMockData(): void {
    // Mock blog posts
    this.blogPosts = [
      {
        id: 1,
        title: 'Getting Started with Angular 19',
        content:
          'Learn about the latest features in Angular 19 and how to use them in your projects.',
        date: new Date('2024-12-01'),
        tags: ['Angular', 'Web Development'],
      },
      {
        id: 2,
        title: 'Building Responsive UIs with Tailwind CSS',
        content:
          'Discover how to create beautiful, responsive user interfaces using Tailwind CSS utility classes.',
        date: new Date('2024-11-15'),
        tags: ['CSS', 'Tailwind', 'Design'],
      },
      {
        id: 3,
        title: 'State Management Patterns in Angular',
        content:
          'Explore different approaches to managing state in your Angular applications.',
        date: new Date('2024-10-20'),
        tags: ['Angular', 'State Management'],
      },
    ];

    // Mock todo items
    this.todoItems = [
      {
        id: 't1',
        title: 'Implement user authentication',
        completed: false,
        priority: 'high',
        dueDate: new Date('2024-12-20'),
        description: 'Add login/signup functionality using JWT authentication',
      },
      {
        id: 't2',
        title: 'Create data visualization dashboard',
        completed: false,
        priority: 'medium',
        dueDate: new Date('2024-12-25'),
        description: 'Build charts and graphs to display key metrics',
      },
      {
        id: 't3',
        title: 'Write unit tests for API services',
        completed: true,
        priority: 'low',
        dueDate: new Date('2024-12-10'),
        description: 'Ensure at least 85% code coverage',
      },
    ];

    // Update stats
    this.updateStats();

    // Mock recent activity
    this.recentActivity = [
      {
        type: 'blog',
        action: 'Published',
        item: 'Getting Started with Angular 19',
        date: new Date('2024-12-01'),
      },
      {
        type: 'todo',
        action: 'Completed',
        item: 'Write unit tests for API services',
        date: new Date('2024-12-10'),
      },
      {
        type: 'blog',
        action: 'Updated',
        item: 'Building Responsive UIs with Tailwind CSS',
        date: new Date('2024-11-20'),
      },
      {
        type: 'todo',
        action: 'Added',
        item: 'Implement user authentication',
        date: new Date('2024-11-15'),
      },
    ];
  }

  updateStats(): void {
    // Update blog stats
    this.stats.totalBlogs = this.blogPosts.length;
    this.stats.publishedBlogs = this.blogPosts.filter((blog) => true).length; // In a real app, you'd check a 'published' property
    this.stats.draftBlogs = this.stats.totalBlogs - this.stats.publishedBlogs;

    // Update todo stats
    this.stats.totalTodos = this.todoItems.length;
    this.stats.completedTodos = this.todoItems.filter(
      (todo) => todo.completed
    ).length;
    this.stats.pendingTodos = this.stats.totalTodos - this.stats.completedTodos;
  }

  setActiveTab(tab: 'overview' | 'blogs' | 'todos'): void {
    this.activeTab = tab;
  }

  onBlogCardClick(blog: CardData): void {
    console.log('View blog:', blog);
    // In a real app, navigate to blog detail view
  }

  onEditBlog(blog: CardData): void {
    console.log('Edit blog:', blog);
    // In a real app, open edit form or navigate to edit page
  }

  onDeleteBlog(blog: CardData): void {
    console.log('Delete blog:', blog);
    // In a real app, show confirmation dialog then delete
    this.blogPosts = this.blogPosts.filter((b) => b.id !== blog.id);
    this.updateStats();
  }

  onTodoStatusChange(todo: TodoItem): void {
    console.log('Todo status changed:', todo);
    // In a real app, update in database
    const index = this.todoItems.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
      this.todoItems[index] = { ...todo };
      this.updateStats();
    }
  }

  onEditTodo(todo: TodoItem): void {
    console.log('Edit todo:', todo);
    // In a real app, open edit form
  }

  onDeleteTodo(todo: TodoItem): void {
    console.log('Delete todo:', todo);
    // In a real app, show confirmation dialog then delete
    this.todoItems = this.todoItems.filter((t) => t.id !== todo.id);
    this.updateStats();
  }

  toggleTodoExpand(todoId: string | number): void {
    if (this.expandedTodoIds.has(todoId)) {
      this.expandedTodoIds.delete(todoId);
    } else {
      this.expandedTodoIds.add(todoId);
    }
  }

  isTodoExpanded(todoId: string | number): boolean {
    return this.expandedTodoIds.has(todoId);
  }
}
