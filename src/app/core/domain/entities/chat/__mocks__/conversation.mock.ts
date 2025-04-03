import { ConversationEntity, ConversationType } from '../conversation-entity';
import { mockParticipants } from './conversation-participant.mock';
import { mockMessage } from './message.mock';

export const mockConversation = new ConversationEntity({
  id: '1',
  title: 'Test Conversation',
  type: ConversationType.INDIVIDUAL,
  participants: mockParticipants,
  messages: [mockMessage],
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
});
