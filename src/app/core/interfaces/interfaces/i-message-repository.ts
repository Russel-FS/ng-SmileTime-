import { Observable } from 'rxjs';
import { MessageEntity } from '../../domain/model/message-entity';

export interface IMessageRepository {
  getByConversationId(conversationId: string): Observable<MessageEntity[]>;
  create(message: MessageEntity): Observable<MessageEntity>;
  markAsRead(messageId: string, userId: number): Observable<void>;
  getMessageHistory(conversationId: string, limit: number): Observable<MessageEntity[]>;
  watchNewMessages(conversationId: string): Observable<MessageEntity>;
}
