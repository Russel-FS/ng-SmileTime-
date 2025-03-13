import { AutoMap } from '@automapper/classes';

export class ConversationParticipant {

  userId: number | string;
  userName: string;
  avatar: string;
  lastActive?: Date;
  joinedAt?: Date;
  leftAt?: Date;
  selected?: boolean;
  role?: string;
  isOnline?: boolean;
  isTyping?: boolean;
  conversationId?: string | number;

  constructor(params: {
    userId: number | string;
    userName: string;
    avatar: string;
    lastActive?: Date;
    joinedAt?: Date;
    leftAt?: Date;
    selected?: boolean;
    role?: string;
    isOnline?: boolean;
    isTyping?: boolean;
    conversationId?: string | number
  }) {
    this.userId = params.userId;
    this.userName = params.userName;
    this.avatar = params.avatar;
    this.lastActive = params.lastActive;
    this.joinedAt = params.joinedAt;
    this.leftAt = params.leftAt;
    this.selected = params.selected;
    this.role = params.role;
    this.isOnline = params.isOnline;
    this.isTyping = params.isTyping;
    this.conversationId = params.conversationId
  }

  isActive(): boolean {
    return this.isOnline || false;
  }

  isSelected(): boolean {
    return this.selected || false;
  }

}
