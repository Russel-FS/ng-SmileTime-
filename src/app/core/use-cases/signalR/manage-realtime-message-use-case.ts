import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRealTimeComunication } from '../../interfaces/signalR/i-real-time-comunication';
import { IMessageRepository } from '../../interfaces/repositorys/chat/i-message.repository';
import { MessageEntity } from '../../domain/model/chat/message-entity';

@Injectable()
export class ManageRealtimeMessageUseCase {
  constructor(
    private realTimeCommunication: IRealTimeComunication,
    private messageRepository: IMessageRepository,
  ) {}

  initializeConnection(): void {
    this.realTimeCommunication.connect();
  }

  closeConnection(): void {
    this.realTimeCommunication.disconnect();
  }

  listenForMessages(): Observable<MessageEntity> {
    return this.realTimeCommunication.onMessage();
  }
  /**
   * Env a un mensaje a trav s del SignalR. Primero se guarda el mensaje en
   * la base de datos y luego se env a a trav s del SignalR. El mensaje
   * guardado se devuelve como Observable.
   */
  sendMessage(message: MessageEntity): Observable<MessageEntity> {
    return new Observable<MessageEntity>((observer) => {
      this.messageRepository.sendMessage(message).subscribe({
        next: (savedMessage) => {
          observer.next(savedMessage);
          observer.complete();
        },
        complete: () => {
          this.realTimeCommunication.sendMessage(message);
        },
        error: (error) => observer.error(error),
      });
    });
  }
}
