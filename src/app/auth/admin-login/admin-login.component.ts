import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  isForgotPasswordActive: boolean = false;
  loginError: string = '';

  constructor(
    private router: Router,
    private adminAuthService: AdminAuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId) && this.adminAuthService.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  ngOnInit(): void {}

  toggleForgotPassword(showForgotPassword: boolean): void {
    this.isForgotPasswordActive = showForgotPassword;
    this.loginError = ''; // Clear any previous login errors
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid && isPlatformBrowser(this.platformId)) {
      const loginSuccess = this.adminAuthService.login(this.loginForm.value);
      
      if (!loginSuccess) {
        this.loginError = 'Invalid admin credentials';
        this.markFormGroupTouched(this.loginForm);
      } else {
        this.router.navigate(['/admin/dashboard']);
      }
    } else if (!this.loginForm.valid) {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  onForgotPasswordSubmit(): void {
    if (this.forgotPasswordForm.valid && isPlatformBrowser(this.platformId)) {
      // Here you would typically call an admin password reset service
      console.log('Admin password reset requested for:', this.forgotPasswordForm.value.email);
      // Add your admin password reset logic here
      this.forgotPasswordForm.reset();
      this.toggleForgotPassword(false);
    } else {
      this.markFormGroupTouched(this.forgotPasswordForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}