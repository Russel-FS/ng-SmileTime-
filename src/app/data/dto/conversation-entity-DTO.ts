import { ConversationType } from '../../core/domain/model/chat/conversation-entity';
import { ConversationParticipantDTO } from './conversation-participant-DTO';
import { MessageEntityDTO } from './message-DTO';

export interface ConversationEntityDTO {
  id?: string | number;
  title: string;
  type: ConversationType;
  participants: ConversationParticipantDTO[];
  messages: MessageEntityDTO[];
  createdAt: Date;
  updatedAt?: Date;
  isActive: boolean;
}
