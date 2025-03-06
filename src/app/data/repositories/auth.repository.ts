import { Inject, Injectable } from "@angular/core";
import { IAuthRepository } from "../../core/interfaces/i-auth-repository";
import { AuthCredentials, AuthResponse } from "../../core/domain/models/auth";
import { Observable } from "rxjs";
import { AuthService } from "../../infrastructure/datasources/auth.service";
import { IAuthService } from "../../core/interfaces/i-auth-service";

@Injectable({
  providedIn: 'root',
})
export class AuthRepository implements IAuthRepository {
  constructor(@Inject(IAuthService) private dataSource: IAuthService) {}

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.dataSource.login(credentials);
  }

  logout(): Observable<void> {
    return this.dataSource.logout();
  }

  isAuthenticated(): Observable<boolean> {
    return this.dataSource.isAuthenticated();
  }
}
