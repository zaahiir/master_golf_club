import { Routes } from '@angular/router';

export const memberRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Member'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./list-members/list-members.component').then(m => m.ListMembersComponent),
        data: {
          title: 'List Member'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-members/create-members.component').then(m => m.CreateMembersComponent),
        data: {
          title: 'New Member'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-members/update-members.component').then(m => m.UpdateMembersComponent),
        data: {
          title: 'Update Member'
        },
      },
      {
        path: 'update',
        loadComponent: () => import('./update-members/update-members.component').then(m => m.UpdateMembersComponent),
        data: {
          title: 'Update Member'
        },
      },
    ]
  }
];
