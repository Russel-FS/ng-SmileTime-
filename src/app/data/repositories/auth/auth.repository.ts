import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuthRepository } from '../../../core/interfaces/repositorys/auth/i-auth-repository';
import { AuthCredentials, AuthResponse } from '../../../core/domain/model/auth/auth';
import { Observable } from 'rxjs';
import { IAuthService } from '../../../core/interfaces/datasource/auth/i-auth-service';

@Injectable({
  providedIn: 'root',
})

export class AuthRepository implements IAuthRepository {
  private apiUrl = 'http://localhost:4200'; // URL de la API

  constructor(
    @Inject(IAuthService) private dataSource: IAuthService, 
    private http: HttpClient // Inyectamos HttpClient en el mismo constructor
  ) {}

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.dataSource.login(credentials);
  }

  logout(): Observable<void> {
    return this.dataSource.logout();
  }

  isAuthenticated(): Observable<boolean> {
    return this.dataSource.isAuthenticated();
  }

  register(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.dataSource.register(credentials);
  }

  recoverPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/recover-password`, { email });
  }
  
}
