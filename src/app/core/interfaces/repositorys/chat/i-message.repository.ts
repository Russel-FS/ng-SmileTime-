import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { MessageEntity } from '../../../domain/entities/chat/message-entity';
import { ConversationEntity } from '../../../domain/entities/chat/conversation-entity';
export interface IMessageRepository {
  getMessages(): Observable<MessageEntity[]>;
  getMessage(id: string): Observable<MessageEntity>;
  sendMessage(message: MessageEntity): Observable<MessageEntity>;
}

export const IMessageRepository = new InjectionToken<IMessageRepository>('MessageRepository');
