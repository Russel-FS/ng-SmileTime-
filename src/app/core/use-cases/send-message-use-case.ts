import { Observable, tap } from 'rxjs';
import { IMessageRepository } from '../interfaces/i-message.repository';
import { Message } from '../domain/models/messages';
import { Inject, Injectable } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';

@Injectable({
  providedIn: 'root',
})
export class SendMessageUseCase {
  constructor(
    private signalRService: SignalRService,
    @Inject(IMessageRepository) private messageRepository: IMessageRepository,
  ) {}

  execute(message: Message): Observable<Message> {
    return this.messageRepository.sendMessage(message).pipe(
      tap(() => {
        this.signalRService.sendMessage('Russel', message.text);
      }),
    );
  }
}
