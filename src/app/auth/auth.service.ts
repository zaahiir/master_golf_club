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
  }

  login(credentials: { username: string; password: string }): void {
    if (this.inBrowser) {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('user', JSON.stringify({ username: credentials.username }));
      this.router.navigate(['/home']); // Redirect to home page
    }
  }

  logout(): void {
    if (this.inBrowser) {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']); // Redirect to login page
    }
  }

  isLoggedIn(): boolean {
    if (this.inBrowser) {
      return sessionStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }
}

