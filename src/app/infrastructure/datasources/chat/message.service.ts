import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageEntityDTO } from '../../../data/dto/message-DTO';
import { mockMessage } from '../../../core/domain/model/chat/__mocks__/message.mock';
import { IMessageDatasource } from '../../../core/interfaces/datasource/auth/i-message-datasource';
import { ConversationEntityDTO } from '../../../data/dto/conversation-entity-DTO';
import { Mapper } from '@automapper/core';
import { ConversationType } from '../../../core/domain/model/chat/conversation-entity';


@Injectable({
  providedIn: 'root',
})
export class MessageDataSource implements IMessageDatasource {
  private apiUrl = 'api/messages';

  constructor(private http: HttpClient
  ) { }

  //test datos de prueba
  getMessages(): Observable<MessageEntityDTO[]> {
    throw new Error('Method not implemented.');
  }

  getMessage(id: string): Observable<MessageEntityDTO> {
    throw new Error('Method not implemented.');
  }

  sendMessage(message: MessageEntityDTO): Observable<MessageEntityDTO> {
    console.log('Mensaje enviada', message);
    return this.http.post<MessageEntityDTO>(this.apiUrl, message);
  }
}
