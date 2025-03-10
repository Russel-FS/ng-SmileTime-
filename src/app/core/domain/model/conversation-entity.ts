import { ConversationParticipant } from './conversation-participant';
import { MessageEntity } from './message-entity';

export enum ConversationType {
  INDIVIDUAL = 'individual',
  GROUP = 'group',
}
export class ConversationEntity {
  constructor(
    public id: string,
    public type: ConversationType,
    public participants: ConversationParticipant[],
    public title?: string,
    public lastMessage?: MessageEntity,
    public createdAt: Date = new Date(),
    public updatedAt?: Date,
    public isActive: boolean = true,
  ) {}

  addParticipant(participant: ConversationParticipant): void {
    this.participants.push(participant);
  }

  removeParticipant(userId: number): void {
    const index = this.participants.findIndex((p) => p.userId === userId);
    if (index !== -1) {
      this.participants[index].leftAt = new Date();
    }
  }

  getUnreadCount(userId: number): number {
    const participant = this.participants.find((p) => p.userId === userId);
    if (!participant || !this.lastMessage) return 0;
    return participant.lastRead < this.lastMessage.createdAt ? 1 : 0;
  }
}
