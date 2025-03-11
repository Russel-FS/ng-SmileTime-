import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { MessageEntity } from '../../../domain/model/chat/message-entity';
import { ConversationEntity } from '../../../domain/model/chat/conversation-entity';
export interface IMessageRepository {
  getMessages(): Observable<ConversationEntity[]>;
  getMessage(id: string): Observable<ConversationEntity>;
  sendMessage(message: ConversationEntity): Observable<ConversationEntity>;
}

export const IMessageRepository = new InjectionToken<IMessageRepository>('MessageRepository');
