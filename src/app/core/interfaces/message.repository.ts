import { Observable } from 'rxjs';
import { Message } from '../domain/models/message.model';
import { InjectionToken } from '@angular/core';

export interface IMessageRepository {
    getMessages(): Observable<Message[]>;
    getMessage(id: string): Observable<Message>;
    createMessage(message: Message): Observable<Message>; 
}

export const IMessageRepository = new InjectionToken<IMessageRepository>('MessageRepository');
