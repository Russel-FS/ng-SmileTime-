import { Observable } from 'rxjs';
import { AuthCredentials, AuthResponse } from '../../../domain/model/auth/auth';
import { InjectionToken } from '@angular/core';

export interface IAuthService {
  login(credentials: AuthCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  isAuthenticated(): Observable<boolean>;
}
export const IAuthService = new InjectionToken<IAuthService>('AuthService');
