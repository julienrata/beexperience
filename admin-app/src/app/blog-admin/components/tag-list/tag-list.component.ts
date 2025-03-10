import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="admin-tag-list">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Tags</h2>
        <a routerLink="../tags/create" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add New Tag</a>
      </div>
      
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr *ngFor="let tag of mockTags">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{tag.name}}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{tag.slug}}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{tag.count}}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a [routerLink]="['../tags/edit', tag.id]" class="text-blue-600 hover:text-blue-800 mr-4">Edit</a>
                <button class="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class TagListComponent implements OnInit {
  mockTags = [
    { id: 1, name: 'Technology', slug: 'technology', count: 8 },
    { id: 2, name: 'Design', slug: 'design', count: 5 },
    { id: 3, name: 'Business', slug: 'business', count: 3 },
    { id: 4, name: 'Marketing', slug: 'marketing', count: 4 },
    { id: 5, name: 'Development', slug: 'development', count: 6 }
  ];
  
  constructor() {}
  
  ngOnInit(): void {}
}