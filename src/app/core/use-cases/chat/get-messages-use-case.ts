import { Observable } from 'rxjs';
import { IMessageRepository } from '../../interfaces/repositorys/chat/i-message.repository';
import { Inject, Injectable } from '@angular/core';  
import { ConversationEntity } from '../../domain/model/chat/conversation-entity';

@Injectable({
  providedIn: 'root',
})
export class GetMessagesUseCase {
  constructor(@Inject(IMessageRepository) private messageRepository: IMessageRepository) {}

  execute(): Observable<ConversationEntity[]> {
    return this.messageRepository.getMessages();
  }
}
