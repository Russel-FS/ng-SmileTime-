import { MessageEntity, MessageType } from '../message-entity';
import { mockAttachments } from './attachment.mock';
import { mockParticipant } from './conversation-participant.mock';
import { mockMessageStatus } from './message-status.mock';

export const mockMessage = new MessageEntity({
  id: '1',
  sender: mockParticipant,
  content: 'prueba',
  type: MessageType.TEXT,
  status: [mockMessageStatus],
  createdAt: new Date(),
  modifiedAt: new Date(),
  attachments: mockAttachments,
  isDeleted: false,
  conversationId: '1',
});
