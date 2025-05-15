import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}member_login/`, { username, password })
      .pipe(
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
    const refreshToken = localStorage.getItem('refresh_token');
    
    // Clear all localStorage items
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    sessionStorage.removeItem('session_type');
    
    // Send logout request to backend
    return this.http.post(`${this.apiUrl}member_logout/`, { refresh_token: refreshToken })
      .pipe(
        catchError(this.handleError)
      );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post(`${this.apiUrl}token/refresh/`, { refresh: refreshToken })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('access_token', response.access);
        }),
        catchError(this.handleError)
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  // Add this method to fix the errors
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getUserType(): string | null {
    return localStorage.getItem('user_type');
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('user_id');
    return userId ? parseInt(userId, 10) : null;
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