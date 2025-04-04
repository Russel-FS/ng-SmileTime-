import { Injectable } from '@angular/core';
import { MessageEntity } from '../../core/domain/entities/chat/message-entity';
import { MessageEntityDTO } from '../dto/message-DTO';
import { AttachmentMapper } from './attachment-mapper';
import { ParticipantMapper } from './participant.mapper';
import { MessageStatusMapper } from './message-status.mapper';

@Injectable({
  providedIn: 'root',
})
export class MessageMapper {
  constructor(
    private participantMapper: ParticipantMapper,
    private attachmentMapper: AttachmentMapper,
    private messageStatusMapper: MessageStatusMapper,
  ) { }

  toDomain(dto: MessageEntityDTO): MessageEntity {
    return new MessageEntity({
      id: dto.messageId || 0,
      sender: this.participantMapper.toDomain(dto.sender),
      content: dto.content,
      type: dto.messageType,
      status: dto.messageStatuses.map((s) => this.messageStatusMapper.toDomain(s)),
      createdAt: dto.createdAt,
      modifiedAt: dto.modifiedAt,
      attachments: dto.attachments?.map((a) => this.attachmentMapper.toModel(a)),
      isDeleted: dto.isDeleted,
      conversationId: dto.conversationId,
    });
  }

  toDTO(entity: MessageEntity): MessageEntityDTO {
    return {
      messageId: entity.id || 0,
      sender: this.participantMapper.toDTO(entity.sender),
      content: entity.content,
      messageType: entity.type,
      messageStatuses: entity.status.map((s) => this.messageStatusMapper.toDTO(s)),
      createdAt: entity.createdAt,
      modifiedAt: entity.modifiedAt,
      attachments: entity.attachments?.map((a) => this.attachmentMapper.toDTO(a)),
      isDeleted: entity.isDeleted,
      conversationId: entity.conversationId,
    };
  }
}
