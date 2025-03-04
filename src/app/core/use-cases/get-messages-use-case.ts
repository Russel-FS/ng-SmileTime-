import { Observable } from 'rxjs';
import { IMessageRepository } from '../interfaces/message.repository';
import { Message } from '../domain/models/messages';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetMessagesUseCase {
  constructor(@Inject(IMessageRepository) private messageRepository: IMessageRepository) {}

  execute(): Observable<Message[]> {
    return this.messageRepository.getMessages();
  }
}
