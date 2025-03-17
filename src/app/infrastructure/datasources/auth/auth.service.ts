import { Injectable } from '@angular/core';
import { IAuthService } from '../../../core/interfaces/datasource/auth/i-auth-service';
import { AuthCredentials, AuthResponse } from '../../../core/domain/model/auth/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../config/app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements IAuthService {
  // url de la api , en este caso es una api de prueba que se encuentra en github dev

  constructor(
    private http: HttpClient,
    private apiUrl: ApiConfig,
  ) { }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl.getEndpoint('login')}`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl.get('apiUrl')}/logout`, {});
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/is-authenticated`);
  }

  register(credentials: AuthCredentials): Observable<void> {
    return this.http.post<void>(`api/url/register`, credentials);
  }
}
