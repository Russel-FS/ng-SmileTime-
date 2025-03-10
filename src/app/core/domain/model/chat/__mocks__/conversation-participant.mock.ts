import { ConversationParticipant } from '../conversation-participant';

export const mockParticipant = new ConversationParticipant({
  userId: 1,
  userName: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  lastActive: new Date(),
  joinedAt: new Date(),
});

export const mockParticipants = [
  mockParticipant,
  new ConversationParticipant({
    userId: 2,
    userName: 'Russel flores',
    avatar: 'https://example.com/avatar2.jpg',
    lastActive: new Date(),
    joinedAt: new Date(),
  }),
];
