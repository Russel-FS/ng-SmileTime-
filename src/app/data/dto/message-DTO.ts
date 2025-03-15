import { MessageType } from '../../core/domain/model/chat/message-entity';
import { MessageStatus } from '../../core/domain/model/chat/message-status';
import { AttachmentEntityDTO } from './attachment-entity-DTO';
import { ConversationEntityDTO } from './conversation-entity-DTO';
import { ConversationParticipantDTO } from './conversation-participant-DTO';
import { MessageStatusDTO } from './message-status-DTO';

export interface MessageEntityDTO {
  id: string | number;
  sender: ConversationParticipantDTO;
  content: string;
  type: MessageType;
  status: MessageStatusDTO[];
  createdAt: Date;
  modifiedAt?: Date | null;
  attachments?: AttachmentEntityDTO[];
  isDeleted: boolean;
  conversationId?: string | number;
}
