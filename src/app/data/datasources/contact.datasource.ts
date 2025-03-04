import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactDTO } from '../dto/contactDTO';

@Injectable({
  providedIn: 'root',
})
export class ContactDataSource {
  private apiUrl = 'api/messages';

  private mockContacts: ContactDTO[] = [
    {
      id: 1,
      name: 'Flores',
      role: 'Dentista',
      avatar: 'icons/user-profile.svg',
      isOnline: true,
      isTyping: false,
      lastMessage: 'ultima vez, 10:00',
      unread: 2,
      isSelected: true,
    },
    {
      id: 2,
      name: 'James',
      role: 'Dentista',
      avatar: 'icons/user-profile.svg',
      isOnline: false,
      isTyping: false,
      lastMessage: 'ultima vez, 10:00',
      unread: 0,
      isSelected: false,
    },
    {
      id: 3,
      name: 'Mallca',
      role: 'soperte',
      avatar: 'icons/user-profile.svg',
      isOnline: true,
      isTyping: false,
      lastMessage: 'ultima vez, 10:00',
      unread: 1,
      isSelected: false,
    },
  ];

  getContacts(): Observable<ContactDTO[]> {
    return new Observable<ContactDTO[]>((observer) => {
      observer.next(this.mockContacts);
      observer.complete();
    });
  }

  getContact(id: string): Observable<ContactDTO> {
    return new Observable<ContactDTO>((observer) => {
      const contact = this.mockContacts.find((c) => c.id === Number(id));
      if (contact) {
        observer.next(contact);
      } else {
        observer.error('Contact not found');
      }
      observer.complete();
    });
  }

  createContact(contact: ContactDTO): Observable<ContactDTO> {
    return new Observable<ContactDTO>((observer) => {
      const newContact = { ...contact, id: this.mockContacts.length + 1 };
      this.mockContacts.push(newContact);
      observer.next(newContact);
      observer.complete();
    });
  }

  updateContact(contact: ContactDTO): Observable<ContactDTO> {
    return new Observable<ContactDTO>((observer) => {
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
