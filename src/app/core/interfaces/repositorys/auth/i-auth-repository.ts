import { Observable } from 'rxjs';
import { AuthCredentials, AuthResponse } from '../../../domain/entities/auth/auth';
import { InjectionToken } from '@angular/core';

export interface IAuthRepository {
  login(credentials: AuthCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  isAuthenticated(): Observable<boolean>;
  register(credentials: AuthCredentials): Observable<AuthResponse>;
}

export const IAuthRepository = new InjectionToken<IAuthRepository>('AuthRepository');
