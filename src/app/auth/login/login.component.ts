// login.component.ts
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

interface LoginForm {
  username: string;
  password: string;
}

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isRegistrationActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize forms regardless of platform
    this.initializeForms();
    
    // Only check login status in browser
    if (isPlatformBrowser(this.platformId) && this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {}

  private initializeForms(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleRegistration(showRegistration: boolean): void {
    this.isRegistrationActive = showRegistration;
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid && isPlatformBrowser(this.platformId)) {
      // For now, just login without credentials
      this.authService.login(this.loginForm.value);
      this.router.navigate(['/home']);
    } else if (!this.loginForm.valid) {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid && isPlatformBrowser(this.platformId)) {
      const formData: RegisterForm = this.registerForm.value;
      // Here you would typically call a registration service
      // For now, just redirect
      this.router.navigate(['/home']);
    } else if (this.registerForm.valid) {
      this.markFormGroupTouched(this.registerForm);
    }
  }

  socialLogin(platform: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/home']);
    }
  }

  socialRegister(platform: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.navigate(['/home']);
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