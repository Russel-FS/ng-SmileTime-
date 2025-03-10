import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageEntityDTO } from '../../data/dto/message-DTO';
import { mockMessage } from '../../core/domain/model/chat/__mocks__/message.mock';

@Injectable({
  providedIn: 'root',
})
export class MessageDataSource {
  private apiUrl = 'api/messages';

  constructor(private http: HttpClient) {}

  //test datos de prueba
  getMessages(): Observable<MessageEntityDTO[]> {
    return new Observable<MessageEntityDTO[]>((observer) => {
      observer.next([mockMessage]);
      observer.complete();
    });
  }

  getMessage(id: string): Observable<MessageEntityDTO> {
    return new Observable<MessageEntityDTO>((observer) => {
      observer.next(mockMessage);
      observer.complete();
    });
  }

  sendMessage(message: MessageEntityDTO): Observable<MessageEntityDTO> {
    return new Observable<MessageEntityDTO>((observer) => {
      observer.next(mockMessage);
      observer.complete();
    });
  }
}
