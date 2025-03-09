import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRealTimeComunication } from '../interfaces/i-real-time-comunication';
import { IMessageRepository } from '../interfaces/i-message.repository';
import { Message } from '../domain/models/messages';

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

  listenForMessages(): Observable<Message> {
    return this.realTimeCommunication.onMessage();
  }

  sendMessage(message: Message): Observable<Message> {
    return new Observable<Message>((observer) => {
      this.messageRepository.sendMessage(message).subscribe({
        next: (savedMessage) => {
          this.realTimeCommunication.sendMessage(savedMessage);
          observer.next(savedMessage);
          observer.complete();
        },
        error: (error) => observer.error(error),
      });
    });
  }
}
