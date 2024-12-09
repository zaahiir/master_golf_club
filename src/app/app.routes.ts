import { Routes } from '@angular/router'; 
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { AuthGuard } from './auth/auth.guard';

// Admin imports
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { AdminLogoutComponent } from './auth/admin-logout/admin-logout.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { AdminLayoutTemplateComponent } from './layout/admin-layout-template/admin-layout-template.component';
import { AuthRedirectResolver } from './auth/auth-redirect.resolver';
import { AdminAuthRedirectResolver } from './auth/admin-auth-redirect.resolver';
import { RootRedirectResolver } from './auth/RootRedirectResolver';

export const routes: Routes = [
  // Root Redirect
  {
    path: '',
    resolve: {
      rootRedirect: RootRedirectResolver
    },
    component: DefaultLayoutComponent
  },
  
  // Member Routes
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
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
  
  // Admin Routes
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin/logout',
    component: AdminLogoutComponent
  },
  {
    path: 'admin',
    component: AdminLayoutTemplateComponent,
    canActivate: [AdminAuthGuard],
    resolve: {
      adminRedirect: AdminAuthRedirectResolver
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./admin-view/routes').then(m => m.adminViewRoutes)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  
  // Member Catch-All Route (Unauthenticated)
  {
    path: '**',
    component: DefaultLayoutComponent,
    resolve: {
      authRedirect: AuthRedirectResolver
    }
  }
];