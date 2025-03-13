export interface ConversationParticipantDTO {
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
}
