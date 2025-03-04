import { Observable } from 'rxjs';
import { IMessageRepository } from '../interfaces/message.repository';
import { Message } from '../domain/models/messages';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SendMessageUseCase {
  constructor(@Inject(IMessageRepository) private messageRepository: IMessageRepository) {}

  execute(message: Message): Observable<Message> {
    return this.messageRepository.sendMessage(message);
  }
}
