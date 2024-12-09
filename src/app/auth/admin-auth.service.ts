import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

interface AdminUser {
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private inBrowser: boolean;
  
  // Predefined admin users with strong credentials
  private adminUsers: AdminUser[] = [
    {
      username: 'superadmin',
      password: 'Admin@2024!Secure',
      email: 'superadmin@company.com'
    },
    {
      username: 'adminmanager',
      password: 'Manager#SecureAccess2024',
      email: 'admin.manager@company.com'
    }
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.inBrowser = isPlatformBrowser(platformId);
  }

  login(credentials: { username: string; password: string }): boolean {
    const validAdmin = this.adminUsers.find(
      user => 
        user.username === credentials.username && 
        user.password === credentials.password
    );

    if (validAdmin && this.inBrowser) {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      sessionStorage.setItem('adminUser', JSON.stringify({ 
        username: validAdmin.username,
        email: validAdmin.email
      }));
      this.router.navigate(['/admin/dashboard']); // Redirect to admin dashboard
      return true;
    }
    return false;
  }

  logout(): void {
    if (this.inBrowser) {
      sessionStorage.removeItem('isAdminLoggedIn');
      sessionStorage.removeItem('adminUser');
      this.router.navigate(['/admin/login']); // Redirect to admin login
    }
  }

  isLoggedIn(): boolean {
    if (this.inBrowser) {
      return sessionStorage.getItem('isAdminLoggedIn') === 'true';
    }
    return false;
  }
}
