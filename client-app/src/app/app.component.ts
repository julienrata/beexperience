import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="container mx-auto px-4 py-6">
          <h1 class="text-3xl font-bold">Blog App</h1>
          <nav class="mt-4">
            <ul class="flex space-x-4">
              <li><a routerLink="/" class="text-blue-600 hover:text-blue-800">Home</a></li>
              <li><a routerLink="/blogs" class="text-blue-600 hover:text-blue-800">Blogs</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main class="container mx-auto px-4 py-6">
        <router-outlet></router-outlet>
      </main>
      <footer class="bg-gray-200 py-6">
        <div class="container mx-auto px-4">
          <p class="text-center text-gray-600">© 2025 Blog App</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    main {
      flex: 1;
    }
  `]
})
export class AppComponent {
  title = 'Blog App';
}