import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntityDto } from '../../data/dto/user-DTO';
import { IUserDatasource } from '../../core/interfaces/datasource/chat/I-user-datasource';

@Injectable({
  providedIn: 'root',
})
export class ContactDataSource implements IUserDatasource {
  private apiUrl = 'api/messages';

  private mockContacts: UserEntityDto[] = [
    {
      id: 1,
      username: 'Russel',
      email: 'smith@hospital.com',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'patient',
      lastActive: new Date(),
      isActive: true,
      createdAt: new Date(),
    },
  ];

  getContacts(): Observable<UserEntityDto[]> {
    return new Observable<UserEntityDto[]>((observer) => {
      observer.next(this.mockContacts);
      observer.complete();
    });
  }

  getContact(id: string): Observable<UserEntityDto> {
    return new Observable<UserEntityDto>((observer) => {
      const contact = this.mockContacts.find((c) => c.id === Number(id));
      if (contact) {
        observer.next(contact);
      } else {
        observer.error('Contact not found');
      }
      observer.complete();
    });
  }

  createContact(contact: UserEntityDto): Observable<UserEntityDto> {
    return new Observable<UserEntityDto>((observer) => {
      const newContact = { ...contact, id: this.mockContacts.length + 1 };
      this.mockContacts.push(newContact);
      observer.next(newContact);
      observer.complete();
    });
  }

  updateContact(contact: UserEntityDto): Observable<UserEntityDto> {
    return new Observable<UserEntityDto>((observer) => {
      const index = this.mockContacts.findIndex((c) => c.id === contact.id);
      if (index !== -1) {
        this.mockContacts[index] = contact;
        observer.next(contact);
      } else {
        observer.error('Contact not found');
      }
      observer.complete();
    });
  }

  deleteContact(id: string): Observable<void> {
    return new Observable<void>((observer) => {
      const index = this.mockContacts.findIndex((c) => c.id === Number(id));
      if (index !== -1) {
        this.mockContacts.splice(index, 1);
        observer.next();
      } else {
        observer.error('Contact not found');
      }
      observer.complete();
    });
  }
}
