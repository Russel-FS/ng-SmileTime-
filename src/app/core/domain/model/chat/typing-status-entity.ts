export class TypingStatusEntity {
  constructor(
    public userId: number,
    public conversationId: string,
    public isTyping: boolean,
    public lastTypingAt: Date = new Date(),
  ) {}

  hasExpired(timeoutMs: number = 5000): boolean {
    const now = new Date();
    return now.getTime() - this.lastTypingAt.getTime() > timeoutMs;
  }
}
