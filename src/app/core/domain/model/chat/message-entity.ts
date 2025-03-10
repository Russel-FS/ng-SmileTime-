import { AttachmentEntity } from './attachment-entity';
import { ConversationEntity } from './conversation-entity';
import { ConversationParticipant } from './conversation-participant';
import { MessageStatus } from './message-status';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system',
}

export class MessageEntity {
  constructor(
    public id: string,
    public conversation: ConversationEntity,
    public senderId: ConversationParticipant,
    public content: string,
    public type: MessageType = MessageType.TEXT,
    public status: MessageStatus,
    public createdAt: Date = new Date(),
    public modifiedAt?: Date,
    public attachments?: AttachmentEntity[],
    public isDeleted: boolean = false,
  ) {}
}
