import { Injectable } from '@angular/core';
import { MessageStatus } from '../../core/domain/model/chat/message-status';
import { MessageStatusDTO } from '../dto/message-status-DTO';

@Injectable({
  providedIn: 'root',
})
export class MessageStatusMapper {
  toDomain(dto: MessageStatusDTO): MessageStatus {
    return new MessageStatus(dto.userId, dto.status, dto.statusTimestamp);
  }

  toDTO(entity: MessageStatus): MessageStatusDTO {
    return {
      userId: entity.userId,
      status: entity.status,
      statusTimestamp: entity.statusTimestamp,
    };
  }
}
