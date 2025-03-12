import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { ConversationParticipantDTO } from '../../../../data/dto/conversation-participant-DTO';

export interface IUserDatasource {
  getContacts(): Observable<ConversationParticipantDTO[]>;
  getContact(id: string): Observable<ConversationParticipantDTO>;
  createContact(contact: ConversationParticipantDTO): Observable<ConversationParticipantDTO>;
  updateContact(contact: ConversationParticipantDTO): Observable<ConversationParticipantDTO>;
  deleteContact(id: string): Observable<void>;
}

export const IUserDatasource = new InjectionToken<IUserDatasource>('UserDatasource');
