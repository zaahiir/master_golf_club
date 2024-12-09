import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

interface AdminUser {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private inBrowser: boolean;
  private currentUserSubject: BehaviorSubject<AdminUser | null>;
  public currentUser: Observable<AdminUser | null>;

  // Simulated admin users (in a real app, this would come from a backend)
  private adminUsers = [
    { username: 'superadmin', password: 'admin123', role: 'super-admin' },
    { username: 'editor', password: 'editor123', role: 'content-editor' },
    { username: 'viewer', password: 'viewer123', role: 'read-only' }
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.inBrowser = isPlatformBrowser(platformId);
    this.currentUserSubject = new BehaviorSubject<AdminUser | null>(this.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Validate credentials against the simulated user database
  login(credentials: { username: string; password: string }): boolean {
    if (!this.inBrowser) return false;

    const matchedUser = this.adminUsers.find(
      user => user.username === credentials.username && 
              user.password === credentials.password
    );

    if (matchedUser) {
      // Store user information securely
      sessionStorage.setItem('adminUser', JSON.stringify({
        username: matchedUser.username,
        role: matchedUser.role
      }));
      
      // Update current user subject
      this.currentUserSubject.next({
        username: matchedUser.username,
        role: matchedUser.role
      });

      // Navigate to dashboard
      this.router.navigate(['/admin/dashboard']);
      return true;
    }
    return false;
  }

  // Retrieve current logged-in user
  getCurrentUser(): AdminUser | null {
    if (!this.inBrowser) return null;

    const userJson = sessionStorage.getItem('adminUser');
    return userJson ? JSON.parse(userJson) : null;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.inBrowser && !!sessionStorage.getItem('adminUser');
  }

  // Get current user's role
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  // Logout method
  logout(): void {
    if (this.inBrowser) {
      sessionStorage.removeItem('adminUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/admin/login']);
    }
  }

  // Check if user has specific role
  hasRole(requiredRole: string): boolean {
    const userRole = this.getUserRole();
    return userRole === requiredRole;
  }
}