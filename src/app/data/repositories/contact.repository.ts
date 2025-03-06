import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IContactRepository } from '../../core/interfaces/IContactRepository';
import { ContactDataSource } from '../../infrastructure/datasources/api-contact.datasource';
import { ContactMapper } from '../mappers/contact-mapper';
import { Contact } from '../../core/domain/models/contact';
import { IContactDatasource } from '../../core/interfaces/IContactDatasource';

@Injectable({
  providedIn: 'root',
})
export class ContactRepository implements IContactRepository {
  constructor(
    @Inject(IContactDatasource)
    private dataSource: IContactDatasource,
    private mapper: ContactMapper,
  ) {}

  getContacts(): Observable<Contact[]> {
    return this.dataSource
      .getContacts()
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.toDomain(dto))));
  }

  getContact(id: string): Observable<Contact> {
    return this.dataSource.getContact(id).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  createContact(contact: Contact): Observable<Contact> {
    const dto = this.mapper.toDTO(contact);
    return this.dataSource.createContact(dto).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  updateContact(contact: Contact): Observable<Contact> {
    const dto = this.mapper.toDTO(contact);
    return this.dataSource.updateContact(dto).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  deleteContact(id: string): Observable<void> {
    return this.dataSource.deleteContact(id);
  }
}
