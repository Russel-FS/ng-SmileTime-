import { Status } from '../../core/domain/entities/chat/message-status';

export interface MessageStatusDTO {
  userId?: string | number;
  status: Status;
  statusTimestamp: Date;
}
