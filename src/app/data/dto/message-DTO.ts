import { MessageStatus, MessageType } from '../../core/domain/model/chat/message-entity'; 
import { AttachmentEntityDTO } from './attachment-entity-DTO';

export interface MessageEntityDTO {
  id: string;
  conversationId: string;
  senderId: number;
  content: string;
  type: MessageType;
  status: MessageStatus;
  createdAt: Date;
  modifiedAt?: Date;
  attachments: AttachmentEntityDTO[];
  isDeleted: boolean;
}
