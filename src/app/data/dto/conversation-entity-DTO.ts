import { ConversationType } from '../../core/domain/entities/chat/conversation-entity';
import { ConversationParticipantDTO } from './conversation-participant-DTO';
import { MessageEntityDTO } from './message-DTO';

export interface ConversationEntityDTO {
  conversationId?: string | number;
  title: string;
  type: ConversationType;
  participants?: ConversationParticipantDTO[];
  messages?: MessageEntityDTO[];
  createdAt: Date;
  updatedAt?: Date;
  isActive: boolean;
}

