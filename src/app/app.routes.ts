import { Routes } from '@angular/router';
import { HomeComponent } from './client/home/home.component';
import { BlogComponent } from './client/blog/blog.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { StyleguideComponent } from './admin/styleguide/styleguide.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'styleguide',
        component: StyleguideComponent,
      },
      // Additional admin routes can be added here
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
