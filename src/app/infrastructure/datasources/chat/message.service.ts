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
    return new Observable<MessageEntityDTO[]>((observer) => {
      observer.next([mockMessage as MessageEntityDTO]);
      observer.complete();
    });
  }

  getMessage(id: string): Observable<MessageEntityDTO> {
    return new Observable<MessageEntityDTO>((observer) => {
      observer.next(mockMessage as MessageEntityDTO);
      observer.complete();
    });
  }

  sendMessage(message: MessageEntityDTO): Observable<ConversationEntityDTO> {
    return new Observable<ConversationEntityDTO>((observer) => {
      const mockConversation: ConversationEntityDTO = {
        id: '2',
        participants: [],
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        type: ConversationType.INDIVIDUAL,
        title: "mensaje",
      };

      observer.next(mockConversation);
      observer.complete();
    });
  }
}
