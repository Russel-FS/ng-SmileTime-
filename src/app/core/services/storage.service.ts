import { Injectable } from '@angular/core';
import { AuthResponse } from '../domain/models/auth';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setAuthData(authData: AuthResponse): void {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('userId', authData.userId);
    localStorage.setItem('email', authData.email);
  }

  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
  }
  // se obtiene el token
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
}
