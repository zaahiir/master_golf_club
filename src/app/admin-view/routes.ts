import { Routes } from '@angular/router';

export const adminViewRoutes: Routes = [
    {
      path: 'dashboard',
      loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    // {
    //   path: 'course',
    //   loadComponent: () => import('./course/course.component').then(m => m.CourseComponent)
    // }
];