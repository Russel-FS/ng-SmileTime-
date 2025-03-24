import { Status } from '../../core/domain/model/chat/message-status';

export interface MessageStatusDTO {
  userId?: string | number;
  status: Status;
  statusTimestamp: Date;
}
