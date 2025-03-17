import { Injectable } from '@angular/core';
import { MessageEntity } from '../../core/domain/model/chat/message-entity';
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
      id: dto.id,
      sender: this.participantMapper.toDomain(dto.sender),
      content: dto.content,
      type: dto.type,
      status: dto.status.map((s) => this.messageStatusMapper.toDomain(s)),
      createdAt: dto.createdAt,
      modifiedAt: dto.modifiedAt,
      attachments: dto.attachments?.map((a) => this.attachmentMapper.toModel(a)),
      isDeleted: dto.isDeleted,
      conversationId: dto.conversationId,
    });
  }

  toDTO(entity: MessageEntity): MessageEntityDTO {
    return {
      id: entity.id || '',
      sender: this.participantMapper.toDTO(entity.sender),
      content: entity.content,
      type: entity.type,
      status: entity.status.map((s) => this.messageStatusMapper.toDTO(s)),
      createdAt: entity.createdAt,
      modifiedAt: entity.modifiedAt,
      attachments: entity.attachments?.map((a) => this.attachmentMapper.toDTO(a)),
      isDeleted: entity.isDeleted,
      conversationId: entity.conversationId,
    };
  }
}
