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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId) && this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    // Initialize forms with FormBuilder for better readability
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
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid && isPlatformBrowser(this.platformId)) {
      const loginData = {
        ...this.loginForm.value,
        rememberMe: this.rememberMe
      };
      
      this.authService.login(loginData);
      this.router.navigate(['/home']);
    } else if (!this.loginForm.valid) {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  onForgotPasswordSubmit(): void {
    if (this.forgotPasswordForm.valid && isPlatformBrowser(this.platformId)) {
      // Here you would typically call a password reset service
      console.log('Password reset requested for:', this.forgotPasswordForm.value.email);
      // Add your password reset logic here
      
      // Show success message (in a real app, you might want to show a toast/notification)
      alert('Password reset link has been sent to your email.');
      
      this.forgotPasswordForm.reset();
      this.toggleForgotPassword(false);
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