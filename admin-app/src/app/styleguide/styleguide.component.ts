import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-styleguide',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="styleguide-container">
      <h1 class="text-2xl font-bold mb-6">Style Guide</h1>
      
      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-4">Colors</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="color-sample">
            <div class="h-20 bg-blue-600 rounded"></div>
            <p class="mt-2 font-medium">Primary</p>
            <p class="text-sm text-gray-600">#2563eb</p>
          </div>
          <div class="color-sample">
            <div class="h-20 bg-gray-800 rounded"></div>
            <p class="mt-2 font-medium">Secondary</p>
            <p class="text-sm text-gray-600">#1f2937</p>
          </div>
          <div class="color-sample">
            <div class="h-20 bg-green-500 rounded"></div>
            <p class="mt-2 font-medium">Success</p>
            <p class="text-sm text-gray-600">#10b981</p>
          </div>
          <div class="color-sample">
            <div class="h-20 bg-red-500 rounded"></div>
            <p class="mt-2 font-medium">Error</p>
            <p class="text-sm text-gray-600">#ef4444</p>
          </div>
        </div>
      </section>
      
      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-4">Typography</h2>
        <div class="space-y-4">
          <div>
            <h1 class="text-4xl font-bold">Heading 1</h1>
            <p class="text-sm text-gray-600">4xl / Bold</p>
          </div>
          <div>
            <h2 class="text-3xl font-bold">Heading 2</h2>
            <p class="text-sm text-gray-600">3xl / Bold</p>
          </div>
          <div>
            <h3 class="text-2xl font-semibold">Heading 3</h3>
            <p class="text-sm text-gray-600">2xl / Semi-bold</p>
          </div>
          <div>
            <h4 class="text-xl font-semibold">Heading 4</h4>
            <p class="text-sm text-gray-600">xl / Semi-bold</p>
          </div>
          <div>
            <p class="text-base">Body text</p>
            <p class="text-sm text-gray-600">base / Regular</p>
          </div>
          <div>
            <p class="text-sm">Small text</p>
            <p class="text-sm text-gray-600">sm / Regular</p>
          </div>
        </div>
      </section>
      
      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-4">Buttons</h2>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-4">
            <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Primary Button</button>
            <button class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Secondary Button</button>
            <button class="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-50">Outline Button</button>
          </div>
          <div class="flex flex-wrap gap-4">
            <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Success</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Error</button>
            <button class="bg-yellow-400 text-gray-800 px-4 py-2 rounded hover:bg-yellow-500">Warning</button>
          </div>
        </div>
      </section>
      
      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-4">Form Elements</h2>
        <div class="space-y-4 max-w-md">
          <div>
            <label class="block text-gray-700 mb-2">Text Input</label>
            <input type="text" class="w-full px-3 py-2 border rounded" placeholder="Enter text..." />
          </div>
          <div>
            <label class="block text-gray-700 mb-2">Select</label>
            <select class="w-full px-3 py-2 border rounded">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 mb-2">Textarea</label>
            <textarea class="w-full px-3 py-2 border rounded" rows="3" placeholder="Enter text..."></textarea>
          </div>
          <div class="flex items-center">
            <input type="checkbox" class="mr-2" id="checkbox" />
            <label for="checkbox">Checkbox</label>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .styleguide-container {
      padding: 20px;
    }
  `]
})
export class StyleguideComponent {}