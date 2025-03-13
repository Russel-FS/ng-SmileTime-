import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntityDto } from '../../data/dto/user-DTO';
import { IUserDatasource } from '../../core/interfaces/datasource/chat/I-user-datasource';
import { ConversationParticipantDTO } from '../../data/dto/conversation-participant-DTO';

@Injectable({
  providedIn: 'root',
})
export class ContactDataSource implements IUserDatasource {
  private apiUrl = 'api/messages';

  private mockContacts: ConversationParticipantDTO[] = [
    {
      userId: 1,
      userName: 'Russel',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastActive: new Date(),
      selected: true
    },
    {
      userId: 2,
      userName: 'Solano',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      lastActive: new Date(),
      selected: false
    },
    {
      userId: 3,
      userName: 'Freddy',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      lastActive: new Date(),
      selected: false
    },
  ];

  getContacts(): Observable<ConversationParticipantDTO[]> {
    return new Observable<ConversationParticipantDTO[]>((observer) => {
      observer.next(this.mockContacts);
      observer.complete();
    });
  }

  getContact(id: string): Observable<ConversationParticipantDTO> {
    return new Observable<ConversationParticipantDTO>((observer) => {
      const contact = this.mockContacts.find((c) => c.userId === Number(id));
      if (contact) {
        observer.next(contact);
      } else {
        observer.error('Contact not found');
      }
      observer.complete();
    });
  }

  createContact(contact: ConversationParticipantDTO): Observable<ConversationParticipantDTO> {
    return new Observable<ConversationParticipantDTO>((observer) => {
      const newContact = { ...contact, id: this.mockContacts.length + 1 };
      this.mockContacts.push(newContact);
      observer.next(newContact);
      observer.complete();
    });
  }

  updateContact(contact: ConversationParticipantDTO): Observable<ConversationParticipantDTO> {
    return new Observable<ConversationParticipantDTO>((observer) => {
      const index = this.mockContacts.findIndex((c) => c.userId === contact.userId);
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
      const index = this.mockContacts.findIndex((c) => c.userId === Number(id));
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
