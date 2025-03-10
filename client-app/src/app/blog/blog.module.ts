import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogComponent } from './blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogTagComponent } from './components/blog-tag/blog-tag.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      { 
        path: '', 
        component: BlogListComponent
      },
      { 
        path: 'tag/:slug', 
        component: BlogTagComponent
      },
      { 
        path: ':slug', 
        component: BlogDetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BlogListComponent,
    BlogTagComponent,
    BlogDetailComponent
  ],
  exports: [RouterModule]
})
export class BlogModule { }