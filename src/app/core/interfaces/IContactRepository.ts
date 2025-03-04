import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Contact } from '../domain/models/contact';

export interface IContactRepository {
  getContacts(): Observable<Contact[]>;
  getContact(id: string): Observable<Contact>;
  createContact(contact: Contact): Observable<Contact>;
  updateContact(contact: Contact): Observable<Contact>;
  deleteContact(id: string): Observable<void>;
}

export const IContactRepository = new InjectionToken<IContactRepository>('ContactRepository');
