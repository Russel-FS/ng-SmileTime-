import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDTO } from '../../data/dto/messageDTO';

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
        {
          id: 1,
          message: 'Hola Dr. Flores Solano, ¿en que puedo ayudar?',
          isUser: false,
          time: new Date(),
        },
      ]);
      observer.complete();
    });
  }

  getMessage(id: string): Observable<MessageDTO> {
    return new Observable<MessageDTO>((observer) => {
      observer.next({ id: 1, message: 'Message 1', time: new Date() });
      observer.complete();
    });
  }

  sendMessage(message: MessageDTO): Observable<MessageDTO> {
    console.log(message);
    return new Observable<MessageDTO>((observer) => {
      observer.next({ id: message.id, message: message.message, time: new Date() });
      observer.complete();
    });
  }
}
