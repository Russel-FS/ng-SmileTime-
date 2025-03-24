import { ConversationType } from '../../core/domain/model/chat/conversation-entity';
import { ConversationParticipantDTO } from './conversation-participant-DTO';
import { MessageEntityDTO } from './message-DTO';

export interface ConversationEntityDTO {
  ConversationId?: string | number;
  title: string;
  type: ConversationType;
  Participants?: ConversationParticipantDTO[];
  messages?: MessageEntityDTO[];
  createdAt: Date;
  updatedAt?: Date;
  isActive: boolean;
}

