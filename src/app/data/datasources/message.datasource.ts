import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../../core/domain/models/message.model';
import { MessageDTO } from '../dto/messageDTO';

@Injectable({
  providedIn: 'root',
})
export class MessageDataSource {
  private apiUrl = 'api/messages';

  constructor(private http: HttpClient) {}

  //test datos de prueba
  getMessages(): Observable<MessageDTO[]> {
    return new Observable<MessageDTO[]>((observer) => {
      observer.next([
        { id: '1', message: 'Message 1', time: new Date() },
        { id: '2', message: 'Message 2', time: new Date() },
        { id: '3', message: 'Message 3', time: new Date() },
      ]);
      observer.complete();
    });
  }

  getMessage(id: string): Observable<MessageDTO> {
    return new Observable<MessageDTO>((observer) => {
      observer.next({ id: '1', message: 'Message 1', time: new Date() });
      observer.complete();
    });
  }

  createMessage(message: MessageDTO): Observable<MessageDTO> {
    console.log(message);
    return new Observable<MessageDTO>((observer) => {
      observer.next({ id: '1', message: 'Message 1', time: new Date() });
      observer.complete();
    });
  }
}
