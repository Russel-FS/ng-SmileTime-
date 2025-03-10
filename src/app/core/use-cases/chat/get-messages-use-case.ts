import { Observable } from 'rxjs';
import { IMessageRepository } from '../../interfaces/repositorys/chat/i-message.repository';
import { Inject, Injectable } from '@angular/core';
import { MessageEntity } from '../../domain/model/chat/message-entity';

@Injectable({
  providedIn: 'root',
})
export class GetMessagesUseCase {
  constructor(@Inject(IMessageRepository) private messageRepository: IMessageRepository) {}

  execute(): Observable<MessageEntity[]> {
    return this.messageRepository.getMessages();
  }
}
