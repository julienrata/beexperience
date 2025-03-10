import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-tag',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="blog-tag">
      <div class="mb-6">
        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-medium">{{tagName}}</span>
        <h2 class="text-2xl font-bold mt-4">Posts tagged with "{{tagName}}"</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Mock blog posts -->
        <div *ngFor="let i of [1, 2, 3]" class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="h-48 bg-gray-300"></div>
          <div class="p-6">
            <div class="flex gap-2 mb-3">
              <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{{tagName}}</span>
            </div>
            <h3 class="text-xl font-semibold mb-2">Tagged Post {{i}}</h3>
            <p class="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a [routerLink]="['/blogs', 'tagged-post-' + i]" class="text-blue-600 font-medium hover:text-blue-800">Read More →</a>
          </div>
        </div>
      </div>
      
      <div class="mt-8">
        <a routerLink="/blogs" class="text-blue-600 hover:text-blue-800">← Back to all posts</a>
      </div>
    </div>
  `,
  styles: []
})
export class BlogTagComponent implements OnInit {
  tagName: string = 'Technology';
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['slug']) {
        this.tagName = params['slug'].charAt(0).toUpperCase() + params['slug'].slice(1);
      }
    });
  }
}