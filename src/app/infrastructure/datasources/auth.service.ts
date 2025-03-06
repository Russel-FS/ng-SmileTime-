import { Injectable } from '@angular/core';
import { IAuthService } from '../../core/interfaces/i-auth-service';
import { AuthCredentials, AuthResponse } from '../../core/domain/models/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  constructor() {}

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    console.log('AuthService.login'  + credentials);
    return new Observable<AuthResponse>();
  }

  logout(): Observable<void> {
    return new Observable<void>();
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>();
  }
}
