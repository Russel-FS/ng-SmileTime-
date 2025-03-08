import { Injectable } from '@angular/core';
import { IAuthService } from '../../core/interfaces/i-auth-service';
import { AuthCredentials, AuthResponse } from '../../core/domain/models/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  // url de la api , en este caso es una api de prueba que se encuentra en github dev
  private apiUrl = 'https://upgraded-invention-4jvv5wrjx6wq27g-5011.app.github.dev';
  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/Auth/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/is-authenticated`);
  }
}
