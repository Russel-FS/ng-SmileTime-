import { AttachmentEntity } from './attachment-entity';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system',
}

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
}
export class MessageEntity {
  constructor(
    public id: string,
    public conversationId: string,
    public senderId: number,
    public content: string,
    public type: MessageType = MessageType.TEXT,
    public status: MessageStatus = MessageStatus.SENT,
    public createdAt: Date = new Date(),
    public modifiedAt?: Date,
    public attachments: AttachmentEntity[] = [],
    public isDeleted: boolean = false,
  ) {}

  markAsRead(): void {
    this.status = MessageStatus.READ;
  }

  markAsDelivered(): void {
    this.status = MessageStatus.DELIVERED;
  }
}
