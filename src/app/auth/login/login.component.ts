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

  setNewPasswordForm: FormGroup = new FormGroup({
    verification_code: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm_password: new FormControl('', [Validators.required])
  });

  isForgotPasswordActive: boolean = false;
  isSetNewPasswordActive: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
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

    this.setNewPasswordForm = this.formBuilder.group({
      verification_code: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('new_password');
    const confirmPassword = form.get('confirm_password');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPassword?.errors?.['passwordMismatch']) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
      return null;
    }
  }

  toggleForgotPassword(showForgotPassword: boolean): void {
    this.isForgotPasswordActive = showForgotPassword;
    this.isSetNewPasswordActive = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  showSetNewPasswordForm(): void {
    this.isForgotPasswordActive = false;
    this.isSetNewPasswordActive = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  backToLogin(): void {
    this.isForgotPasswordActive = false;
    this.isSetNewPasswordActive = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid && isPlatformBrowser(this.platformId)) {
      this.isLoading = true;
      this.errorMessage = '';

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authService.login(username, password).subscribe({
        next: (response) => {
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
      this.successMessage = '';
      const email = this.forgotPasswordForm.value.email;

      this.authService.requestPasswordReset(email).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Show success message and switch to set new password form
          this.successMessage = 'Verification code has been sent to your email. Please check your email and use the code to set a new password.';
          this.forgotPasswordForm.reset();

          // Automatically show the set new password form after 3 seconds
          setTimeout(() => {
            this.showSetNewPasswordForm();
          }, 3000);
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

  onSetNewPasswordSubmit(): void {
    if (this.setNewPasswordForm.valid && isPlatformBrowser(this.platformId)) {
      this.isLoading = true;
      this.errorMessage = '';

      const formData = this.setNewPasswordForm.value;

      this.authService.setNewPassword(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Password has been reset successfully. You can now login with your new password.';
          this.setNewPasswordForm.reset();

          // Automatically go back to login form after 3 seconds
          setTimeout(() => {
            this.backToLogin();
          }, 3000);
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 400) {
            this.errorMessage = error.error?.message || 'Invalid verification code or password requirements not met';
          } else if (error.status === 404) {
            this.errorMessage = 'Invalid or expired verification code';
          } else {
            this.errorMessage = 'Password reset failed. Please try again later.';
          }
          console.error('Set new password error', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.setNewPasswordForm);
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
