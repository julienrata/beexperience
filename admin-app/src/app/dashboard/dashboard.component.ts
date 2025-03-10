import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1 class="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-md overflow-hidden p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Blog Statistics</h3>
          <div class="stats">
            <div class="stat-item mb-3">
              <p class="text-gray-600">Total Posts</p>
              <p class="text-3xl font-bold">24</p>
            </div>
            <div class="stat-item mb-3">
              <p class="text-gray-600">Published</p>
              <p class="text-3xl font-bold">18 
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">Active</span>
              </p>
            </div>
            <div class="stat-item">
              <p class="text-gray-600">Drafts</p>
              <p class="text-3xl font-bold">6 
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
              </p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md overflow-hidden p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Popular Tags</h3>
          <div class="tags">
            <div class="tag-item mb-2 flex justify-between">
              <span>Technology</span>
              <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">12 posts</span>
            </div>
            <div class="tag-item mb-2 flex justify-between">
              <span>Design</span>
              <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-purple-100 text-purple-800">8 posts</span>
            </div>
            <div class="tag-item mb-2 flex justify-between">
              <span>Business</span>
              <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">6 posts</span>
            </div>
          </div>
          <button class="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm px-3 py-1.5 mt-4">View All Tags</button>
        </div>
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
          <div class="activity">
            <div class="activity-item mb-3 pb-3 border-b border-gray-200">
              <p class="font-medium">New blog post published</p>
              <p class="text-sm text-gray-600">2 hours ago</p>
            </div>
            <div class="activity-item mb-3 pb-3 border-b border-gray-200">
              <p class="font-medium">Tag 'UX Design' created</p>
              <p class="text-sm text-gray-600">Yesterday</p>
            </div>
            <div class="activity-item">
              <p class="font-medium">Blog post 'Angular Tips' updated</p>
              <p class="text-sm text-gray-600">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
  `]
})
export class DashboardComponent {}