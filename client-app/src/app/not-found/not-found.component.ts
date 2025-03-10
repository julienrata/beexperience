import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="not-found-container flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 class="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p class="text-gray-600 mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
      <a routerLink="/" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
        Return to Home
      </a>
    </div>
  `,
  styles: []
})
export class NotFoundComponent {}