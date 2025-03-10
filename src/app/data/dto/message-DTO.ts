import { MessageType } from '../../core/domain/model/chat/message-entity';
import { MessageStatus } from '../../core/domain/model/chat/message-status';
import { AttachmentEntityDTO } from './attachment-entity-DTO';
import { ConversationEntityDTO } from './conversation-entity-DTO';
import { ConversationParticipantDTO } from './conversation-participant-DTO';

export interface MessageEntityDTO {
  id: string;
  conversation: ConversationEntityDTO;
  senderId: ConversationParticipantDTO;
  content: string;
  type: MessageType;
  status: MessageStatus;
  createdAt: Date;
  modifiedAt?: Date;
  attachments?: AttachmentEntityDTO[];
  isDeleted: boolean;
}
