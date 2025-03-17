import { ConversationParticipant } from './conversation-participant';
import { MessageEntity } from './message-entity';

export enum ConversationType {
  INDIVIDUAL = 'individual',
  GROUP = 'group',
}

export class ConversationEntity {
  id?: string | number;
  title: string;
  type: ConversationType;
  participants: ConversationParticipant[];
  messages: MessageEntity[];
  createdAt: Date;
  updatedAt?: Date;
  isActive: boolean;

  constructor(params: {
    id?: string | number;
    title?: string;
    type?: ConversationType;
    participants: ConversationParticipant[];
    messages?: MessageEntity[];
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
  }) {
    this.id = params.id || '';
    this.title = params.title || '';
    this.type = params.type || ConversationType.INDIVIDUAL;
    this.participants = params.participants;
    this.messages = params.messages || [];
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt;
    this.isActive = params.isActive ?? true;
  }

  addParticipant(participant: ConversationParticipant): void {
    this.participants.push(participant);
  }

  removeParticipant(userId: number): void {
    const index = this.participants.findIndex((p) => p.userId === userId);
    if (index !== -1) {
      this.participants[index].leftAt = new Date();
    }
  }

  addMessage(message: MessageEntity): void {
    this.messages.push(message);
    this.updatedAt = new Date();
  }

  getLastMessage(): MessageEntity | undefined {
    return this.messages[this.messages.length - 1];
  }
}
