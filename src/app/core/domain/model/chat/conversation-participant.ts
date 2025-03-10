export class ConversationParticipant {
  userId: number;
  userName: string;
  avatar: string;
  lastActive?: Date;
  joinedAt?: Date;
  leftAt?: Date;

  constructor(params: {
    userId: number;
    userName: string;
    avatar: string;
    lastActive?: Date;
    joinedAt?: Date;
    leftAt?: Date;
  }) {
    this.userId = params.userId;
    this.userName = params.userName;
    this.avatar = params.avatar;
    this.lastActive = params.lastActive;
    this.joinedAt = params.joinedAt;
    this.leftAt = params.leftAt;
  }

  isActive(): boolean {
    return !this.leftAt;
  }
}
