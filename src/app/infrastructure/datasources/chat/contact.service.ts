import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDatasource } from '../../../core/interfaces/datasource/chat/I-user-datasource';
import { ConversationParticipantDTO } from '../../../data/dto/conversation-participant-DTO';
import { ApiConfig } from '../../config/app.config';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ContactDataSource implements IUserDatasource {

  private mockContacts: ConversationParticipantDTO[] = [
    {
      userId: 1,
      userName: 'Russel',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      lastActive: new Date(),
      selected: true,
      conversationId: '1',
      isOnline: true,
    },
    {
      userId: 2,
      userName: 'Solano',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      lastActive: new Date(),
      selected: false,
      conversationId: 1,
    },
    {
      userId: 3,
      userName: 'Freddy',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      lastActive: new Date(),
      selected: false,
      conversationId: 2,
    },
  ];

  constructor(
    private http: HttpClient,
    private apiUrl: ApiConfig,
    private storage: StorageService,
  ) { }

  getContacts(): Observable<ConversationParticipantDTO[]> {
    const headers = this.storage.getAuthHeaders();
    return this.http.get<ConversationParticipantDTO[]>(`${this.apiUrl.getEndpoint('chat', 'contacts')}`, { headers });
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
