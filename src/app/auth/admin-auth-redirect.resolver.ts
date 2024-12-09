import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthRedirectResolver implements Resolve<void> {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): void {
    // Check if admin is logged in
    if (this.adminAuthService.isLoggedIn()) {
      // If current path is exactly 'admin', redirect to dashboard
      if (state.url === '/admin' || state.url === '/admin/') {
        this.router.navigate(['/admin/dashboard']);
      }
    } else {
      // If not logged in, redirect to admin login
      this.router.navigate(['/admin/login']);
    }
  }
}