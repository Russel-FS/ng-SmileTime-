import { MessageEntity } from '../../../core/domain/entities/chat/message-entity';
export interface PrivateMessage {
    message: MessageEntity;
    recipientId: string | number;
}
