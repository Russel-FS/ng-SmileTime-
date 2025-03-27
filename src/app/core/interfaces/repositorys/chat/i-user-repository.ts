import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { ConversationParticipant } from '../../../domain/entities/chat/conversation-participant';

export interface IUserRepository {
  getContacts(): Observable<ConversationParticipant[]>;
  getContact(id: string): Observable<ConversationParticipant>;
  createContact(contact: ConversationParticipant): Observable<ConversationParticipant>;
  updateContact(contact: ConversationParticipant): Observable<ConversationParticipant>;
  deleteContact(id: string): Observable<void>;
}

export const IUserRepository = new InjectionToken<IUserRepository>('ContactRepository');
