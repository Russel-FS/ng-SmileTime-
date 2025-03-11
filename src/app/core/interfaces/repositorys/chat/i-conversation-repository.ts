import { Observable } from 'rxjs';
import { ConversationEntity } from '../../../domain/model/chat/conversation-entity';

export interface IConversationRepository {
  getByUserId(userId: number): Observable<ConversationEntity[]>;
  create(conversation: ConversationEntity): Observable<ConversationEntity>;
  update(id: string, conversation: Partial<ConversationEntity>): Observable<ConversationEntity>;
  getConversationByUserId(userId: number, contactId: number): Observable<ConversationEntity>;
  getConversationByParticipants(userId: number, contactId: number): Observable<ConversationEntity>;
  getConversations(): Observable<ConversationEntity[]>;
}
