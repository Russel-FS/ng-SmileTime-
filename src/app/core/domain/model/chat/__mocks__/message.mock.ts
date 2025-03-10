import { MessageEntity, MessageType } from '../message-entity';
import { mockAttachments } from './attachment.mock';
import { mockConversation } from './conversation.mock';
import { mockParticipant } from './conversation-participant.mock';
import { mockMessageStatus } from './message-status.mock';

export const mockMessage = new MessageEntity(
  '1',
  mockConversation,
  mockParticipant,
  'Hello World',
  MessageType.TEXT,
  mockMessageStatus,
  new Date(),
  new Date(),
  mockAttachments,
  false,
);
