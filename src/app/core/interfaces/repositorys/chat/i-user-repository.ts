import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { UserEntity } from '../../../domain/model/chat/user-entity';

export interface IUserRepository {
  getContacts(): Observable<UserEntity[]>;
  getContact(id: string): Observable<UserEntity>;
  createContact(contact: UserEntity): Observable<UserEntity>;
  updateContact(contact: UserEntity): Observable<UserEntity>;
  deleteContact(id: string): Observable<void>;
}

export const IUserRepository = new InjectionToken<IUserRepository>('ContactRepository');
