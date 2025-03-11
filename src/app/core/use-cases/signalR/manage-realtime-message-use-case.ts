import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  listenForMessages(): Observable<ConversationEntity> {
    return this.realTimeCommunication.onMessage();
  }
  /**
   * Envia un mensaje a traves del SignalR. Primero se guarda el mensaje en
   * la base de datos y luego se envia a traves del SignalR. El mensaje
   * guardado se devuelve como Observable.
   */
  sendMessage(message: ConversationEntity): Observable<ConversationEntity> {
    return this.messageRepository.sendMessage(message).pipe(
      tap({
        complete: () => this.realTimeCommunication.sendMessage(message)
      })
    );
  }

}
