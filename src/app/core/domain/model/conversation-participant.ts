export class ConversationParticipant {
  constructor(
    public userId: number,
    public conversationId: string,
    public joinedAt: Date = new Date(),
    public lastRead: Date = new Date(),
    public isAdmin: boolean = false,
    public leftAt?: Date,
  ) {}

  isActive(): boolean {
    return !this.leftAt;
  }

  markAsRead(): void {
    this.lastRead = new Date();
  }
}
