import { Injectable } from '@angular/core';
import { MessageEntityDTO } from '../dto/message-DTO';
import { MessageEntity } from '../../core/domain/model/chat/message-entity';
import { AttachmentMapper } from './attachment-mapper';

@Injectable({
  providedIn: 'root',
})
export class MessageMapper {
  constructor(private attachmentMapper: AttachmentMapper) {}
  toModel(dto: MessageEntityDTO): MessageEntity {
    return new MessageEntity(
      dto.id,
      dto.conversationId,
      dto.senderId,
      dto.content,
      dto.type,
      dto.status,
      dto.createdAt,
      dto.modifiedAt,
      dto.attachments.map((attachment) => this.attachmentMapper.toModel(attachment)),
      dto.isDeleted,
    );
  }

  toDTO(model: MessageEntity): MessageEntityDTO {
    return {
      id: model.id,
      conversationId: model.conversationId,
      senderId: model.senderId,
      content: model.content,
      type: model.type,
      status: model.status,
      createdAt: model.createdAt,
      modifiedAt: model.modifiedAt,
      attachments: model.attachments.map((attachment) => this.attachmentMapper.toDTO(attachment)),
      isDeleted: model.isDeleted,
    };
  }
}
