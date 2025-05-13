import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RootRedirectResolver implements Resolve<void> {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  resolve(): void {    
    // Check if regular user is logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return;
    }
    
    // If no one is logged in, redirect to login
    this.router.navigate(['/login']);
  }
}