import { Routes } from '@angular/router';

export const couponsRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Coupons'
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./list-coupon/list-coupon.component').then(m => m.ListCouponComponent),
        data: {
          title: 'List Coupons'
        },
      },
      {
        path: 'add',
        loadComponent: () => import('./create-coupon/create-coupon.component').then(m => m.CreateCouponComponent),
        data: {
          title: 'New Coupons'
        },
      },
      {
        path: 'update/:id',
        loadComponent: () => import('./update-coupon/update-coupon.component').then(m => m.UpdateCouponComponent),
        data: {
          title: 'Update Coupons'
        },
      },
      {
        path: 'update',
        loadComponent: () => import('./update-coupon/update-coupon.component').then(m => m.UpdateCouponComponent),
        data: {
          title: 'Update Coupons'
        },
      },
    ]
  }
];
