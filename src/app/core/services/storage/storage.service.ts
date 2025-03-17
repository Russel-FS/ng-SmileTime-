import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthResponse } from '../../domain/model/auth/auth';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isBrowser!: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  setAuthData(authData: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem('token', authData.token);
      localStorage.setItem('userId', authData.userId);
      localStorage.setItem('email', authData.email);
    }
  }

  clearAuthData(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
    }
  }

  private get items() {
    if (this.isBrowser) {
      return {
        token: this.getToken(),
        userId: localStorage.getItem('userId'),
        email: localStorage.getItem('email'),
      };
    }
    return {
      token: '',
      userId: null,
      email: null,
    };
  }

  getItem(key: keyof typeof this.items): string | null {
    return this.items[key];
  }

  getToken(): string {
    if (this.isBrowser) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }

}
