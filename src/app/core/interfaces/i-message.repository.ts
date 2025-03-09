import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { Message } from '../domain/models/messages';

export interface IMessageRepository {
  getMessages(): Observable<Message[]>;
  getMessage(id: string): Observable<Message>;
  sendMessage(message: Message): Observable<Message>;
}

export const IMessageRepository = new InjectionToken<IMessageRepository>('MessageRepository');
