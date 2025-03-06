import { Injectable } from "@angular/core";
import { IAuthRepository } from "../../core/interfaces/i-auth-repository";
import { AuthCredentials, AuthResponse } from "../../core/domain/models/auth";
import { Observable } from "rxjs";
import { AuthService } from "../../infrastructure/datasources/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthRepository implements IAuthRepository {
  constructor(private dataSource: AuthService) {}

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
