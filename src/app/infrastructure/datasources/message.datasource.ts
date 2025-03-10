import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageEntityDTO } from '../../data/dto/message-DTO';
import { MessageStatus, MessageType } from '../../core/domain/model/chat/message-entity';

@Injectable({
  providedIn: 'root',
})
export class MessageDataSource {
  private apiUrl = 'api/messages';

  constructor(private http: HttpClient) {}

  //test datos de prueba
  getMessages(): Observable<MessageEntityDTO[]> {
    return new Observable<MessageEntityDTO[]>((observer) => {
      observer.next([
        {
          id: '1',
          conversationId: '1',
          senderId: 1,
          content: 'hola mundodd',
          type: MessageType.TEXT,
          status: MessageStatus.SENT,
          createdAt: new Date(),
          modifiedAt: new Date(),
          attachments: [],
          isDeleted: false,
        },
      ]);
      observer.complete();
    });
  }

  getMessage(id: string): Observable<MessageEntityDTO> {
    return new Observable<MessageEntityDTO>((observer) => {
      observer.next({
        id: '1',
        conversationId: '1',
        senderId: 1,
        content: 'hola mundodd',
        type: MessageType.TEXT,
        status: MessageStatus.SENT,
        createdAt: new Date(),
        modifiedAt: new Date(),
        attachments: [],
        isDeleted: false,
      });
      observer.complete();
    });
  }

  sendMessage(message: MessageEntityDTO): Observable<MessageEntityDTO> {
    return new Observable<MessageEntityDTO>((observer) => {
      observer.next({
        id: '1',
        conversationId: '1',
        senderId: 1,
        content: message.content,
        type: MessageType.TEXT,
        status: MessageStatus.SENT,
        createdAt: new Date(),
        modifiedAt: new Date(),
        attachments: [],
        isDeleted: false,
      });
      observer.complete();
    });
  }
}
