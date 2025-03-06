import { Observable } from 'rxjs';
import { AuthCredentials, AuthResponse } from '../domain/models/auth';

export interface IAuthService {
  login(credentials: AuthCredentials): Observable<AuthResponse>;
  logout(): Observable<void>;
  isAuthenticated(): Observable<boolean>;
}
