import { Observable } from 'rxjs';
import { UserEntity } from '../../domain/model/user-entity';

export interface IUserRepository {
  getById(id: number): Observable<UserEntity>;
  getAll(): Observable<UserEntity[]>;
  update(id: number, user: Partial<UserEntity>): Observable<UserEntity>;
  updateLastActive(id: number): Observable<void>;
}
