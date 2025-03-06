import { Observable } from 'rxjs';
import { Contact } from '../domain/models/contact';
import { InjectionToken } from '@angular/core';

export interface IContactDatasource {
  getContacts(): Observable<Contact[]>;
  getContact(id: string): Observable<Contact>;
  createContact(contact: Contact): Observable<Contact>;
  updateContact(contact: Contact): Observable<Contact>;
  deleteContact(id: string): Observable<void>;
}

export const IContactDatasource = new InjectionToken<IContactDatasource>('ContactDatasource');