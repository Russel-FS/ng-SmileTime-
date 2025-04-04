import { Observable } from 'rxjs';
import { ConversationEntity } from '../../../domain/entities/chat/conversation-entity';
import { InjectionToken } from '@angular/core';

export interface IConversationRepository {
  getByUserId(userId: number | string): Observable<ConversationEntity[]>;
  create(conversation: ConversationEntity): Observable<ConversationEntity>;
  update(id: number | string, conversation: Partial<ConversationEntity>): Observable<ConversationEntity>;
  getConversationByParticipants(userId: number | string, contactId: number | string): Observable<ConversationEntity>;
  getConversationById(id: string | number): Observable<ConversationEntity>;
}

export const IConversationRepository = new InjectionToken<IConversationRepository>('ConversationRepository');