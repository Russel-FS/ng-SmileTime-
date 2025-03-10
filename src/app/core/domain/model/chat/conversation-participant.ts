export class ConversationParticipant {
  constructor(
    public userId: number,
    public userName: string,
    public joinedAt?: Date,
    public leftAt?: Date,
    private avatar?: string
  ) {}

  isActive(): boolean {
    return !this.leftAt;
  }
}
