import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="blog-form">
      <div class="mb-6">
        <a routerLink="../" class="text-blue-600 hover:text-blue-800">← Back to Blog List</a>
      </div>
      
      <h2 class="text-xl font-bold mb-6">{{isEditMode ? 'Edit' : 'Create'}} Blog Post</h2>
      
      <form [formGroup]="blogForm" class="bg-white shadow-md rounded-lg p-6">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Title
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="title" 
            type="text" 
            formControlName="title"
            placeholder="Blog post title">
          <p *ngIf="blogForm.get('title')?.errors?.['required'] && blogForm.get('title')?.touched" class="text-red-500 text-xs mt-1">
            Title is required
          </p>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="excerpt">
            Excerpt
          </label>
          <textarea 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="excerpt" 
            formControlName="excerpt"
            rows="3"
            placeholder="Short description for the blog post"></textarea>
          <p *ngIf="blogForm.get('excerpt')?.errors?.['required'] && blogForm.get('excerpt')?.touched" class="text-red-500 text-xs mt-1">
            Excerpt is required
          </p>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
            Content
          </label>
          <textarea 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="content" 
            formControlName="content"
            rows="10"
            placeholder="Blog post content"></textarea>
          <p *ngIf="blogForm.get('content')?.errors?.['required'] && blogForm.get('content')?.touched" class="text-red-500 text-xs mt-1">
            Content is required
          </p>
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="status">
            Status
          </label>
          <select 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="status" 
            formControlName="status">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        
        <div class="flex items-center justify-between">
          <button 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            [disabled]="blogForm.invalid"
            [ngClass]="{'opacity-50 cursor-not-allowed': blogForm.invalid}">
            {{isEditMode ? 'Update' : 'Create'}} Post
          </button>
          <a routerLink="../" class="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
            Cancel
          </a>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class BlogFormComponent implements OnInit {
  blogForm!: FormGroup;
  isEditMode = false;
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.initForm();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        // In a real app, we would fetch the blog post data by ID
        this.populateMockData(parseInt(params['id']));
      }
    });
  }
  
  initForm(): void {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      excerpt: ['', Validators.required],
      content: ['', Validators.required],
      status: ['draft']
    });
  }
  
  populateMockData(id: number): void {
    this.blogForm.patchValue({
      title: `Blog Post ${id}`,
      excerpt: 'This is a sample excerpt for the blog post...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      status: id % 2 === 0 ? 'published' : 'draft'
    });
  }
}