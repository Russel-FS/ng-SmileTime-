import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { MessageEntity } from '../../../domain/model/chat/message-entity';
export interface IMessageRepository {
  getMessages(): Observable<MessageEntity[]>;
  getMessage(id: string): Observable<MessageEntity>;
  sendMessage(message: MessageEntity): Observable<MessageEntity>;
}

export const IMessageRepository = new InjectionToken<IMessageRepository>('MessageRepository');
