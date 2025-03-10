import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <div class="hero-section bg-blue-50 py-20 px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Welcome to Our Blog</h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Discover the latest articles, insights, and stories from our team of experts.</p>
        <button 
          class="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg px-6 py-3"
          routerLink="/blogs">
          Read Our Blog
        </button>
      </div>
      
      <div class="featured-section py-16 px-4">
        <div class="container mx-auto">
          <h2 class="text-3xl font-bold text-center mb-12">Featured Articles</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="h-48 bg-gray-300"></div>
              <div class="p-6">
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Getting Started with Angular</h3>
                <div class="flex gap-2 mb-3">
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">Technology</span>
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800">Design</span>
                </div>
                <p class="text-gray-600 mb-4">Learn the basics of Angular and how to build your first application with this powerful framework.</p>
                <button 
                  class="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm px-3 py-1.5"
                  routerLink="/blogs">Read More →</button>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="h-48 bg-gray-300"></div>
              <div class="p-6">
                <div class="flex gap-2 mb-3">
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">Productivity</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">10 Tips for Better Code Quality</h3>
                <p class="text-gray-600 mb-4">Improve your coding skills with these essential tips that will help you write cleaner, more maintainable code.</p>
                <button 
                  class="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm px-3 py-1.5"
                  routerLink="/blogs">Read More →</button>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="h-48 bg-gray-300"></div>
              <div class="p-6">
                <div class="flex gap-2 mb-3">
                  <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">Business</span>
                </div>
                <h3 class="text-xl font-semibold mb-2">The Future of Web Development</h3>
                <p class="text-gray-600 mb-4">Explore the emerging trends and technologies that are shaping the future of web development.</p>
                <button 
                  class="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm px-3 py-1.5"
                  routerLink="/blogs">Read More →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="cta-section bg-gray-100 py-16 px-4 text-center">
        <div class="container mx-auto max-w-2xl">
          <h2 class="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p class="text-gray-600 mb-8">Stay updated with our latest articles and news delivered directly to your inbox.</p>
          <div class="flex flex-col md:flex-row gap-4 justify-center">
            <input type="email" placeholder="Enter your email" class="px-4 py-3 rounded-lg border border-gray-300 w-full md:w-auto" />
            <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {}