import { Observable } from 'rxjs';
import { ConversationEntity } from '../../../domain/model/chat/conversation-entity';

export interface IConversationRepository {
  getByUserId(userId: number): Observable<ConversationEntity[]>;
  create(conversation: ConversationEntity): Observable<ConversationEntity>;
  update(id: string, conversation: Partial<ConversationEntity>): Observable<ConversationEntity>;
  addParticipant(conversationId: string, userId: number): Observable<void>;
  watchConversationChanges(conversationId: string): Observable<ConversationEntity>;
}
