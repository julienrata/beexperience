import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="blog-detail">
      <div class="mb-6">
        <a routerLink="/blogs" class="text-blue-600 hover:text-blue-800">← Back to all posts</a>
      </div>
      
      <article class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="h-80 bg-gray-300"></div>
        <div class="p-8">
          <div class="flex gap-2 mb-4">
            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Technology</span>
            <span class="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Design</span>
          </div>
          
          <h1 class="text-3xl font-bold mb-4">{{postTitle}}</h1>
          
          <div class="flex items-center text-gray-600 text-sm mb-6">
            <span>John Doe</span>
            <span class="mx-2">•</span>
            <span>March 10, 2025</span>
            <span class="mx-2">•</span>
            <span>5 min read</span>
          </div>
          
          <div class="blog-content prose max-w-none">
            <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <p class="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <h2 class="text-2xl font-bold mt-8 mb-4">Section Heading</h2>
            
            <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <p class="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </article>
      
      <div class="mt-12">
        <h3 class="text-xl font-bold mb-6">Related Posts</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div *ngFor="let i of [1, 2, 3]" class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="h-40 bg-gray-300"></div>
            <div class="p-4">
              <h4 class="text-lg font-semibold mb-2">Related Post {{i}}</h4>
              <p class="text-gray-600 text-sm mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <a routerLink="/blogs/related-{{i}}" class="text-blue-600 text-sm font-medium hover:text-blue-800">Read More →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BlogDetailComponent implements OnInit {
  postTitle: string = 'Blog Post Title';
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['slug']) {
        // Convert slug to title
        this.postTitle = params['slug']
          .split('-')
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    });
  }
}