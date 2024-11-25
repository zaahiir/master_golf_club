import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./main/routes').then(m => m.mainRoutes)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];