import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectResolver implements Resolve<void> {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  resolve(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}