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

  getToken(): string | null {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImJiMGZlOWMwLWM5YzAtNGRiZS1hM2RkLTk2OGYzZTc1NTQ2OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE3NDY2NTY3MTgsImlzcyI6ImFwaSIsImF1ZCI6ImNsaWVudGUifQ.U_tq2mYv35ze1giul3m1aSF6r59XFkIW8G8zMikD7XA';
  }
}
