import { Observable } from 'rxjs';
import { AuthCredentials, AuthResponse } from '../../../domain/model/auth/auth';
import { InjectionToken } from '@angular/core';

export interface IAuthRepository {
  login(credentials: AuthCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  isAuthenticated(): Observable<boolean>;
  register(credentials: AuthCredentials): Observable<AuthResponse>;
  recoverPassword(email: string): Observable<void>;

}

export const IAuthRepository = new InjectionToken<IAuthRepository>('AuthRepository');
