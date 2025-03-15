import { AttachmentEntity } from './attachment-entity';
import { ConversationParticipant } from './conversation-participant';
import { MessageStatus } from './message-status';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system',
}

export class MessageEntity {
  id: string | number;
  sender: ConversationParticipant;
  content: string;
  type: MessageType;
  status: MessageStatus[];
  createdAt: Date;
  modifiedAt?: Date | null;
  attachments?: AttachmentEntity[];
  isDeleted: boolean;
  conversationId?: string | number;

  constructor(params: {
    id: string | number;
    sender: ConversationParticipant;
    content: string;
    type?: MessageType;
    status?: MessageStatus[];
    createdAt?: Date;
    modifiedAt?: Date | null;
    attachments?: AttachmentEntity[];
    isDeleted?: boolean;
    conversationId?: string | number
  }) {
    this.id = params.id;
    this.sender = params.sender;
    this.content = params.content;
    this.type = params.type || MessageType.TEXT;
    this.status = params.status || [];
    this.createdAt = params.createdAt || new Date();
    this.modifiedAt = params.modifiedAt || null;
    this.attachments = params.attachments || [];
    this.isDeleted = params.isDeleted || false;
    this.conversationId = params.conversationId
  }
}
