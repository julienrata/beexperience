import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogAdminComponent } from './blog-admin.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagFormComponent } from './components/tag-form/tag-form.component';

const routes: Routes = [
  {
    path: '',
    component: BlogAdminComponent,
    children: [
      { 
        path: 'blogs',
        component: BlogListComponent
      },
      { 
        path: 'blogs/create', 
        component: BlogFormComponent
      },
      { 
        path: 'blogs/edit/:id', 
        component: BlogFormComponent
      },
      { 
        path: 'tags', 
        component: TagListComponent
      },
      { 
        path: 'tags/create', 
        component: TagFormComponent
      },
      { 
        path: 'tags/edit/:id', 
        component: TagFormComponent 
      },
      { path: '', redirectTo: 'blogs', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BlogListComponent,
    BlogFormComponent,
    TagListComponent,
    TagFormComponent
  ],
  exports: [RouterModule]
})
export class BlogAdminModule { }