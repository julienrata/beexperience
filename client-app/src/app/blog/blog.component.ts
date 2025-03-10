import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div class="blog-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .blog-container {
      padding: 20px;
    }
  `]
})
export class BlogComponent implements OnInit {
  
  constructor() {}

  ngOnInit(): void {
    // Initialize with environment
    console.log('Blog component initialized', environment.apiUrl);
  }
}