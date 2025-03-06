import { Observable } from 'rxjs';
import { AuthCredentials, AuthResponse } from '../domain/models/auth';

export interface IAuthRepository {
  login(credentials: AuthCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  isAuthenticated(): Observable<boolean>;
}
