import { MessageEntity } from '../chat/message-entity';
export interface PrivateMessage extends MessageEntity {
    recipientId: string | number;
}
