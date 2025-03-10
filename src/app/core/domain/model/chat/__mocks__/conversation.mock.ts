import { ConversationEntity, ConversationType } from '../conversation-entity';
import { mockParticipants } from './conversation-participant.mock';

export const mockConversation = new ConversationEntity(
  '1',
  ConversationType.INDIVIDUAL,
  mockParticipants,
  undefined,
  new Date(),
  new Date(),
  true,
);
