import { Observable } from 'rxjs';
import { AuthCredentials, AuthResponse } from '../domain/models/auth';
import { InjectionToken } from '@angular/core';

export interface IAuthRepository {
  login(credentials: AuthCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  isAuthenticated(): Observable<boolean>;
}

export const IAuthRepository = new InjectionToken<IAuthRepository>('AuthRepository');
