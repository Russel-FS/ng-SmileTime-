import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { UserEntityDto } from '../../../../data/dto/user-DTO';

export interface IUserDatasource {
  getContacts(): Observable<UserEntityDto[]>;
  getContact(id: string): Observable<UserEntityDto>;
  createContact(contact: UserEntityDto): Observable<UserEntityDto>;
  updateContact(contact: UserEntityDto): Observable<UserEntityDto>;
  deleteContact(id: string): Observable<void>;
}

export const IUserDatasource = new InjectionToken<IUserDatasource>('UserDatasource');
