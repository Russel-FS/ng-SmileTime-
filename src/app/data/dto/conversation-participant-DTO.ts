export interface ConversationParticipantDTO {
  userId: number;
  userName: string;
  joinedAt?: Date;
  leftAt?: Date;
}
