import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="blog-list">
      <h2 class="text-2xl font-bold mb-6">Blog Posts</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Mock blog posts -->
        <div *ngFor="let i of [1, 2, 3, 4, 5, 6]" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="h-48 bg-gray-300"></div>
          <div class="p-6">
            <div class="flex gap-2 mb-3">
              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Technology</span>
              <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Design</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Blog Post {{i}}</h3>
            <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a [routerLink]="['/blogs', 'post-' + i]" class="text-blue-600 font-medium hover:text-blue-800">Read More →</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BlogListComponent implements OnInit {
  
  constructor() {}
  
  ngOnInit(): void {}
}