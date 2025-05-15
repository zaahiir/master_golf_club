import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  isForgotPasswordActive: boolean = false;
  rememberMe: boolean = false;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Redirect to home if already logged in
    if (isPlatformBrowser(this.platformId) && this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    // Initialize forms with FormBuilder
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  toggleForgotPassword(showForgotPassword: boolean): void {
    this.isForgotPasswordActive = showForgotPassword;
    this.errorMessage = ''; // Clear any error messages when switching forms
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid && isPlatformBrowser(this.platformId)) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      
      this.authService.login(username, password).subscribe({
        next: (response) => {
          // Store tokens and user info in localStorage
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          localStorage.setItem('user_type', response.user_type);
          localStorage.setItem('user_id', response.user_id.toString());
          localStorage.setItem('username', response.username);
          localStorage.setItem('email', response.email);
          
          // Handle "Remember me" functionality
          if (!this.rememberMe) {
            // If remember me is not checked, set session storage instead
            // which will be cleared when the browser is closed
            sessionStorage.setItem('session_type', 'temporary');
          }
          
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 401) {
            this.errorMessage = 'Invalid username or password';
          } else {
            this.errorMessage = 'Login failed. Please try again later.';
          }
          console.error('Login error', error);
        }
      });
    } else if (!this.loginForm.valid) {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  onForgotPasswordSubmit(): void {
    if (this.forgotPasswordForm.valid && isPlatformBrowser(this.platformId)) {
      this.isLoading = true;
      this.errorMessage = '';
      const email = this.forgotPasswordForm.value.email;
      
      this.authService.requestPasswordReset(email).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Show success message
          alert('Password reset link has been sent to your email.');
          this.forgotPasswordForm.reset();
          this.toggleForgotPassword(false);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 404) {
            this.errorMessage = 'Email not found in our records';
          } else {
            this.errorMessage = 'Password reset request failed. Please try again later.';
          }
          console.error('Password reset error', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.forgotPasswordForm);
    }
  }

  toggleRememberMe(event: any): void {
    this.rememberMe = event.target.checked;
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
