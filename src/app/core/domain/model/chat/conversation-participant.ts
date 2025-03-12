export class ConversationParticipant {
  userId: number | string;
  userName: string;
  avatar: string;
  lastActive?: Date;
  joinedAt?: Date;
  leftAt?: Date;
  selected?: boolean;

  constructor(params: {
    userId: number | string;
    userName: string;
    avatar: string;
    lastActive?: Date;
    joinedAt?: Date;
    leftAt?: Date;
    selected?: boolean;
  }) {
    this.userId = params.userId;
    this.userName = params.userName;
    this.avatar = params.avatar;
    this.lastActive = params.lastActive;
    this.joinedAt = params.joinedAt;
    this.leftAt = params.leftAt;
    this.selected = params.selected;
  }

  isActive(): boolean {
    return !this.leftAt;
  }

  isSelected(): boolean {
    return this.selected || false;
  }

}
