import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
    {
      path: '',
      loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
      path: 'about',
      loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    },

];