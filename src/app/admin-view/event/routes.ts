import { Routes } from '@angular/router';

export const eventsRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Events'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./list-event/list-event.component').then(m => m.ListEventComponent),
        data: {
          title: 'List Events'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-event/create-event.component').then(m => m.CreateEventComponent),
        data: {
          title: 'New Events'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-event/update-event.component').then(m => m.UpdateEventComponent),
        data: {
          title: 'Update Events'
        },
      },
      {
        path: 'update',
        loadComponent: () => import('./update-event/update-event.component').then(m => m.UpdateEventComponent),
        data: {
          title: 'Update Events'
        },
      },
    ]
  }
];
