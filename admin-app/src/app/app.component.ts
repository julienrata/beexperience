import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="app-container">
      <header class="app-header bg-gray-800 text-white">
        <div class="container mx-auto px-4 py-6">
          <h1 class="text-3xl font-bold">Admin App</h1>
          <nav class="mt-4">
            <ul class="flex space-x-4">
              <li><a routerLink="/" class="text-gray-300 hover:text-white">Dashboard</a></li>
              <li><a routerLink="/blog" class="text-gray-300 hover:text-white">Blog Management</a></li>
              <li><a routerLink="/styleguide" class="text-gray-300 hover:text-white">Styleguide</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <main class="container mx-auto px-4 py-6">
        <router-outlet></router-outlet>
      </main>
      <footer class="bg-gray-800 text-white py-6">
        <div class="container mx-auto px-4">
          <p class="text-center">© 2025 Admin App</p>
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
  title = 'Admin App';
}