import { Injectable } from '@angular/core';
import { MessageEntity } from '../../core/domain/model/chat/message-entity';
import { MessageEntityDTO } from '../dto/message-DTO';
import { AttachmentMapper } from './attachment-mapper';
import { ConversationMapper } from './conversation.mapper';
import { ParticipantMapper } from './participant.mapper';

@Injectable({
  providedIn: 'root',
})
export class MessageMapper {
  constructor(
    private conversationMapper: ConversationMapper,
    private participantMapper: ParticipantMapper,
    private attachmentMapper: AttachmentMapper,
  ) {}

  toDomain(dto: MessageEntityDTO): MessageEntity {
    return new MessageEntity(
      dto.id,
      this.conversationMapper.toDomain(dto.conversation),
      this.participantMapper.toDomain(dto.senderId),
      dto.content,
      dto.type,
      dto.status,
      dto.createdAt,
      dto.modifiedAt,
      dto.attachments?.map((att) => this.attachmentMapper.toModel(att)),
      dto.isDeleted,
    );
  }

  toDTO(entity: MessageEntity): MessageEntityDTO {
    return {
      id: entity.id,
      conversation: this.conversationMapper.toDTO(entity.conversation),
      senderId: entity.senderId,
      content: entity.content,
      type: entity.type,
      status: entity.status,
      createdAt: entity.createdAt,
      modifiedAt: entity.modifiedAt,
      attachments: entity.attachments?.map((att) => this.attachmentMapper.toDTO(att)),
      isDeleted: entity.isDeleted,
    };
  }
}
