import { Routes } from '@angular/router';

export const adminViewRoutes: Routes = [
    {
      path: 'dashboard',
      data: {
        title: 'List Tee'
      },
      loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
      path: 'members',
      loadChildren: () => import('./members/routes').then(m => m.memberRoutes)
    },
    {
      path: 'plan',
      loadChildren: () => import('./plan/routes').then(m => m.planRoutes)
    },
    {
      path: 'courses',
      loadChildren: () => import('./course/routes').then(m => m.courseRoutes)
    },
    {
      path: 'tee',
      loadChildren: () => import('./tee/routes').then(m => m.teeRoutes)
    },
    {
      path: 'events',
      loadChildren: () => import('./event/routes').then(m => m.eventsRoutes)
    },
    {
      path: 'tournament',
      loadChildren: () => import('./tournament/routes').then(m => m.tournamentRoutes)
    },
    {
      path: 'scoreBoard',
      loadComponent: () => import('./scoreBoard/list-score-board/list-score-board.component').then(m => m.ListScoreBoardComponent)
    },
    {
      path: 'blog',
      loadChildren: () => import('./blogs/routes').then(m => m.blogRoutes)
    },
    {
      path: 'coupon',
      loadChildren: () => import('./coupons/routes').then(m => m.couponsRoutes)
    },
    {
      path: 'reports',
      loadComponent: () => import('./reports/list-report/list-report.component').then(m => m.ListReportComponent)
    }
];