import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IRealTimeComunication } from '../../interfaces/signalR/i-real-time-comunication';
import { IMessageRepository } from '../../interfaces/repositorys/chat/i-message.repository';
import { MessageEntity } from '../../domain/model/chat/message-entity';
import { ConversationEntity } from '../../domain/model/chat/conversation-entity';

@Injectable()
export class ManageRealtimeMessageUseCase {
  constructor(
    private realTimeCommunication: IRealTimeComunication,
    private messageRepository: IMessageRepository,
  ) { }

  initializeConnection(): void {
    this.realTimeCommunication.connect();
  }

  closeConnection(): void {
    this.realTimeCommunication.disconnect();
  }

  listenForMessages(): Observable<MessageEntity> {
    return this.realTimeCommunication.onMessage().pipe(
      map(message => {
        if (!message) {
          throw new Error('Mensaje recibido es nulo o indefinido');
        }
        return message;
      }),
      catchError(error => {
        console.error('Error al recibir mensaje:', error);
        return throwError(() => error);
      })
    );
  }
  /**
   * Envia un mensaje a traves del SignalR. Primero se guarda el mensaje en
   * la base de datos y luego se envia a traves del SignalR. El mensaje
   * guardado se devuelve como Observable.
   */
  sendMessage(message: MessageEntity): Observable<MessageEntity> {
    if (!message) {
      return throwError(() => new Error('El mensaje no puede ser nulo'));
    }
    return this.messageRepository.sendMessage(message).pipe(
      catchError(error => {
        console.error('Error al enviar mensaje:', error);
        return throwError(() => error);
      })
    );
  }

  /**
  * Envía un mensaje a través de SignalR.
  * @param message El mensaje a enviar.
  */
  broadcastMessage(message: MessageEntity): void {
    this.realTimeCommunication.sendMessage(message);
  }

}
