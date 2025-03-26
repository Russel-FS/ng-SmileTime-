import { MessageType } from '../../core/domain/model/chat/message-entity';
import { AttachmentEntityDTO } from './attachment-entity-DTO';
import { ConversationParticipantDTO } from './conversation-participant-DTO';
import { MessageStatusDTO } from './message-status-DTO';
import { UserEntityDto } from './user-DTO';

export interface MessageEntityDTO {
  MessageId: string | number;
  sender: ConversationParticipantDTO;
  content: string;
  type: MessageType;
  messageStatuses: MessageStatusDTO[];
  createdAt: Date;
  modifiedAt?: Date | null;
  attachments?: AttachmentEntityDTO[];
  isDeleted: boolean;
  conversationId?: string | number;
  SenderId?: string;
  Sender?: UserEntityDto;
}

