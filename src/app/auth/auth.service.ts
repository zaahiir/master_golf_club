import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface LoginResponse {
  access: string;
  refresh: string;
  user_type: string;
  user_id: number;
  username: string;
  email: string;
}

export interface PasswordResetRequest {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Use the production URL
  // private apiUrl = 'http://localhost/apis/';
  private apiUrl = 'https://mastergolfclub.com/apis/';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}member_login/`, { username, password })
      .pipe(
        tap((response: LoginResponse) => {
          // Store tokens and user information in local storage
          this.setStorageItem('access_token', response.access);
          this.setStorageItem('refresh_token', response.refresh);
          this.setStorageItem('user_type', response.user_type);
          this.setStorageItem('user_id', response.user_id.toString());
          this.setStorageItem('username', response.username);
          this.setStorageItem('email', response.email);
        }),
        catchError(this.handleError)
      );
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}password_reset/`, { email })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): Observable<any> {
    const refreshToken = this.getStorageItem('refresh_token');

    // Send logout request to backend with proper payload
    return this.http.post(`${this.apiUrl}member_logout/`, { refresh_token: refreshToken })
      .pipe(
        tap(() => {
          // Clear all localStorage items after successful logout
          this.clearAllUserData();
        }),
        catchError((error) => {
          // Even if the server request fails, clear user data
          this.clearAllUserData();
          return throwError(() => error);
        })
      );
  }

  // Helper method to clear all user data
  private clearAllUserData(): void {
    this.removeStorageItem('access_token');
    this.removeStorageItem('refresh_token');
    this.removeStorageItem('user_type');
    this.removeStorageItem('user_id');
    this.removeStorageItem('username');
    this.removeStorageItem('email');
    this.removeSessionItem('session_type');
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getStorageItem('refresh_token');
    return this.http.post(`${this.apiUrl}token/refresh/`, { refresh: refreshToken })
      .pipe(
        tap((response: any) => {
          this.setStorageItem('access_token', response.access);
        }),
        catchError(this.handleError)
      );
  }

  isAuthenticated(): boolean {
    const token = this.getStorageItem('access_token');
    return !!token;
  }

  // Add this method to fix the errors
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getUserType(): string | null {
    return this.getStorageItem('user_type');
  }

  getUserId(): number | null {
    const userId = this.getStorageItem('user_id');
    return userId ? parseInt(userId, 10) : null;
  }

  // Helper methods to safely access storage
  private getStorageItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setStorageItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  private removeStorageItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  private removeSessionItem(key: string): void {
    if (this.isBrowser) {
      sessionStorage.removeItem(key);
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => error);
  }
}
