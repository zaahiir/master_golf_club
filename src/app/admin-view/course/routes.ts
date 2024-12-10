import { Routes } from '@angular/router';

export const courseRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Course'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./list-course/list-course.component').then(m => m.ListCourseComponent),
        data: {
          title: 'List Course'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-course/create-course.component').then(m => m.CreateCourseComponent),
        data: {
          title: 'New Course'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-course/update-course.component').then(m => m.UpdateCourseComponent),
        data: {
          title: 'Update Course'
        },
      },
      {
        path: 'update',
        loadComponent: () => import('./update-course/update-course.component').then(m => m.UpdateCourseComponent),
        data: {
          title: 'Update Course'
        },
      },
    ]
  }
];
