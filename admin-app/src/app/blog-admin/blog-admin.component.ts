import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-blog-admin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="blog-admin-container">
      <h2 class="text-2xl font-bold mb-4">Blog Management</h2>
      <div class="admin-nav mb-6">
        <ul class="flex space-x-4">
          <li><a routerLink="blogs" class="text-blue-600 hover:text-blue-800">Blogs</a></li>
          <li><a routerLink="tags" class="text-blue-600 hover:text-blue-800">Tags</a></li>
        </ul>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .blog-admin-container {
      padding: 20px;
    }
  `]
})
export class BlogAdminComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {
    // Initialize with environment
    console.log('Blog admin component initialized', environment.apiUrl);
  }
}