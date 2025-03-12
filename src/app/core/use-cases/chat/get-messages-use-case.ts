import { Observable } from 'rxjs';
import { IMessageRepository } from '../../interfaces/repositorys/chat/i-message.repository';
import { Inject, Injectable } from '@angular/core';
import { ConversationEntity } from '../../domain/model/chat/conversation-entity';
import { MessageEntity } from '../../domain/model/chat/message-entity';

@Injectable({
  providedIn: 'root',
})
export class GetMessagesUseCase {
  constructor(@Inject(IMessageRepository) private messageRepository: IMessageRepository) { }

  getMessages(): Observable<MessageEntity[]> {
    return this.messageRepository.getMessages();
  }
  getMessage(id: string): Observable<MessageEntity> {
    return this.messageRepository.getMessage(id);
  }
  sendMessage(message: MessageEntity): Observable<MessageEntity> {
    return this.messageRepository.sendMessage(message);
  }
}
