// auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private inBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.inBrowser = isPlatformBrowser(platformId);
    // Clear any existing login state when service initializes
    if (this.inBrowser) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    }
  }

  login(credentials: { username: string; password: string }): void {
    if (this.inBrowser) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({ username: credentials.username }));
      this.router.navigate(['/home']);
    }
  }

  logout(): void {
    if (this.inBrowser) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    if (this.inBrowser) {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }
}
