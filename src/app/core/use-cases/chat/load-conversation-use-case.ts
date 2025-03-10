import { Observable } from 'rxjs';
import { IConversationRepository } from '../../interfaces/repositorys/chat/i-conversation-repository';
import { ConversationEntity } from '../../domain/model/chat/conversation-entity';

export class LoadConversationUseCase {
  constructor(private conversationRepository: IConversationRepository) {}

  execute(userId: number): Observable<ConversationEntity[]> {
    return this.conversationRepository.getByUserId(userId);
  }
}
