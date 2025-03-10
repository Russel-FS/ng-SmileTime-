import { ConversationParticipant } from './conversation-participant';
import { MessageEntity } from './message-entity';

export enum ConversationType {
  INDIVIDUAL = 'individual',
  GROUP = 'group',
}
export class ConversationEntity {
  constructor(
    public id: string | number,
    public type: ConversationType,
    public participants: ConversationParticipant[],
    public lastMessage?: string,
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
}
