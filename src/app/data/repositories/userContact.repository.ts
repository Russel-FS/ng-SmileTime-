import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserEntity } from '../../core/domain/model/chat/user-entity';
import { UserMapper } from '../mappers/user-mapper';
import { IUserRepository } from '../../core/interfaces/repositorys/chat/i-user-repository';
import { IUserDatasource } from '../../core/interfaces/datasource/chat/I-user-datasource';

@Injectable({
  providedIn: 'root',
})
export class ContactRepository implements IUserRepository {
  constructor(
    @Inject(IUserDatasource)
    private dataSource: IUserDatasource,
    private mapper: UserMapper,
  ) {}

  getContacts(): Observable<UserEntity[]> {
    return this.dataSource
      .getContacts()
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.toDomain(dto))));
  }

  getContact(id: string): Observable<UserEntity> {
    return this.dataSource.getContact(id).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  createContact(contact: UserEntity): Observable<UserEntity> {
    const dto = this.mapper.toDTO(contact);
    return this.dataSource.createContact(dto).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  updateContact(contact: UserEntity): Observable<UserEntity> {
    const dto = this.mapper.toDTO(contact);
    return this.dataSource.updateContact(dto).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  deleteContact(id: string): Observable<void> {
    return this.dataSource.deleteContact(id);
  }
}
