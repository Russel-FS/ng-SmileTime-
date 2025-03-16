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
  * Guarda el mensaje en la base de datos 
  */
  sendMessage(message: MessageEntity): Observable<ConversationEntity> {
    if (!message) {
      return throwError(() => new Error('El mensaje no puede ser nulo'));
    }
    return this.messageRepository.sendMessage(message).pipe(
      map(conversation => {
        if (!conversation) {
          throw new Error('La conversación devuelta es nula o indefinida');
        }
        return conversation;
      }),
      catchError(error => {
        console.error('Error al enviar mensaje:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Envía el mensaje por SignalR después de que se haya guardado localmente
   */
  broadcastMessage(message: MessageEntity): void {
    if (message && message.conversationId) {
      this.realTimeCommunication.sendMessage(message);
    }
  }

}
