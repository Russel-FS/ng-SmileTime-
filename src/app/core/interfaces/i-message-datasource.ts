import { Observable } from 'rxjs';
import { Message } from '../domain/models/messages';
import { InjectionToken } from '@angular/core';
import { MessageDTO } from '../../data/dto/messageDTO';

export interface IMessageDatasource {
  getMessages(): Observable<MessageDTO[]>;
  getMessage(id: string): Observable<MessageDTO>;
  sendMessage(message: MessageDTO): Observable<MessageDTO>;
}

export const IMessageDatasource = new InjectionToken<IMessageDatasource>('MessageDatasource');
