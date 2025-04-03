import { Inject, Injectable } from '@angular/core';
import { IAuthRepository } from '../../../core/interfaces/repositorys/auth/i-auth-repository';
import { AuthCredentials, AuthResponse } from '../../../core/domain/entities/auth/auth';
import { Observable } from 'rxjs';
import { IAuthService } from '../../../core/interfaces/datasource/auth/i-auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository implements IAuthRepository {
  constructor(@Inject(IAuthService) private dataSource: IAuthService) { }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.dataSource.login(credentials);
  }

  logout(): Observable<void> {
    return this.dataSource.logout();
  }

  isAuthenticated(): Observable<boolean> {
    return this.dataSource.isAuthenticated();
  }

  register(credentials: AuthCredentials): Observable<void> {
    return this.dataSource.register(credentials);
  }
}
