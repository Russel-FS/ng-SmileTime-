import { ConversationParticipant } from '../conversation-participant';

export const mockParticipant = new ConversationParticipant(1, 'John Doe', new Date(), undefined);

export const mockParticipants = [
  mockParticipant,
  new ConversationParticipant(2, 'Russel flores', new Date(), undefined),
];
