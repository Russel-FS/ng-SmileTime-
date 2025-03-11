import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { MessageEntityDTO } from '../../../../data/dto/message-DTO';
import { ConversationEntityDTO } from '../../../../data/dto/conversation-entity-DTO';

export interface IMessageDatasource {
  getMessages(): Observable<ConversationEntityDTO[]>;
  getMessage(id: string): Observable<ConversationEntityDTO>;
  sendMessage(message: ConversationEntityDTO): Observable<ConversationEntityDTO>;
}

export const IMessageDatasource = new InjectionToken<IMessageDatasource>('MessageDatasource');
