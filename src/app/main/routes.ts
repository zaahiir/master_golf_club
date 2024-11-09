import { Routes } from '@angular/router';

export const mainRoutes: Routes = [
    {
      path: '',
      loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
      path: 'collection',
      loadComponent: () => import('./collection/collection.component').then(m => m.CollectionComponent)
    },
    {
      path: 'collectionPlus',
      loadComponent: () => import('./collection-plus/collection-plus.component').then(m => m.CollectionPlusComponent)
    },
    {
      path: 'BookATee',
      loadComponent: () => import('./book-atee/book-atee.component').then(m => m.BookATeeComponent)
    },
    {
      path: 'information',
      loadComponent: () => import('./information/information.component').then(m => m.InformationComponent)
    },
    {
      path: 'events',
      loadComponent: () => import('./events/events.component').then(m => m.EventsComponent)
    },
    {
      path: 'about',
      loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
    }

];