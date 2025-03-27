import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { AuthResponse } from '../../domain/entities/auth/auth';
import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private isBrowser!: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Guarda los datos de autenticación en el local storage
   * @param authData
   */
  setAuthData(authData: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem('token', authData.token);
      localStorage.setItem('userId', authData.userId);
      localStorage.setItem('email', authData.email);
    }
  }
  /**
   * Elimina los datos de autenticación del local storage
   */
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

  /**
   * Obtiene un item del local storage
   * @param key
   * @returns string | null
   */
  getItem(key: keyof typeof this.items): string | null {
    return this.items[key];
  }

  /**
   * Obtiene el token de autenticación del local storage
   * @returns string
   */
  getToken(): string {
    if (this.isBrowser) {
      return localStorage.getItem('token') || '';
    }
    return '';
  }
  /** 
   *  Obtiene los headers de autenticación para las peticiones HTTP 
   *  @returns HttpHeaders
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
