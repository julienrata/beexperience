import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="tag-form">
      <div class="mb-6">
        <a routerLink="../" class="text-blue-600 hover:text-blue-800">← Back to Tags</a>
      </div>
      
      <h2 class="text-xl font-bold mb-6">{{isEditMode ? 'Edit' : 'Create'}} Tag</h2>
      
      <form [formGroup]="tagForm" class="bg-white shadow-md rounded-lg p-6 max-w-lg">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Name
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="name" 
            type="text" 
            formControlName="name"
            placeholder="Tag name">
          <p *ngIf="tagForm.get('name')?.errors?.['required'] && tagForm.get('name')?.touched" class="text-red-500 text-xs mt-1">
            Name is required
          </p>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="slug">
            Slug
          </label>
          <input 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="slug" 
            type="text" 
            formControlName="slug"
            placeholder="tag-slug">
          <p class="text-gray-500 text-xs mt-1">
            The "slug" is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.
          </p>
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Description
          </label>
          <textarea 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="description" 
            formControlName="description"
            rows="4"
            placeholder="Tag description (optional)"></textarea>
        </div>
        
        <div class="flex items-center justify-between">
          <button 
            type="submit" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            [disabled]="tagForm.invalid"
            [ngClass]="{'opacity-50 cursor-not-allowed': tagForm.invalid}">
            {{isEditMode ? 'Update' : 'Create'}} Tag
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
export class TagFormComponent implements OnInit {
  tagForm!: FormGroup;
  isEditMode = false;
  
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.initForm();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        // In a real app, we would fetch the tag data by ID
        this.populateMockData(parseInt(params['id']));
      }
    });
  }
  
  initForm(): void {
    this.tagForm = this.fb.group({
      name: ['', Validators.required],
      slug: [''],
      description: ['']
    });
    
    // Auto-generate slug from name
    this.tagForm.get('name')?.valueChanges.subscribe(name => {
      if (name && !this.isEditMode) {
        const slug = name.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        this.tagForm.get('slug')?.setValue(slug);
      }
    });
  }
  
  populateMockData(id: number): void {
    const mockTags = [
      { id: 1, name: 'Technology', slug: 'technology', description: 'Posts about technology and innovation.' },
      { id: 2, name: 'Design', slug: 'design', description: 'Everything related to design principles and practices.' },
      { id: 3, name: 'Business', slug: 'business', description: 'Business strategies and insights.' },
      { id: 4, name: 'Marketing', slug: 'marketing', description: 'Digital marketing tips and tricks.' },
      { id: 5, name: 'Development', slug: 'development', description: 'Software development tutorials and guides.' }
    ];
    
    const tag = mockTags.find(t => t.id === id);
    
    if (tag) {
      this.tagForm.patchValue({
        name: tag.name,
        slug: tag.slug,
        description: tag.description
      });
    }
  }
}