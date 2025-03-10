import { ConversationType } from '../../core/domain/model/chat/conversation-entity';
import { ConversationParticipantDTO } from './conversation-participant-DTO';
import { MessageEntityDTO } from './message-DTO';

export interface ConversationEntityDTO {
  id: string | number;
  type: ConversationType;
  participants: ConversationParticipantDTO[];
  lastMessage?: string;
  createdAt: Date;
  updatedAt?: Date;
  isActive: boolean;
}
