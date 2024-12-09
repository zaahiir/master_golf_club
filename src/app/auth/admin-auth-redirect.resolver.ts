import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthRedirectResolver implements Resolve<void> {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  resolve(): void {
    if (this.adminAuthService.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/admin/login']);
    }
  }
}