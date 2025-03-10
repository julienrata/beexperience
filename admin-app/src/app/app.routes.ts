import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'styleguide',
    loadComponent: () => import('./styleguide/styleguide.component').then(c => c.StyleguideComponent)
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog-admin/blog-admin.module').then(m => m.BlogAdminModule)
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];