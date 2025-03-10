export interface ConversationParticipantDTO {
  userId: number;
  userName: string;
  avatar: string;
  lastActive?: Date;
  joinedAt?: Date;
  leftAt?: Date;
}
