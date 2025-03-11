import { Injectable } from '@angular/core';
import { ConversationEntity } from '../../core/domain/model/chat/conversation-entity';
import { ConversationEntityDTO } from '../dto/conversation-entity-DTO';
import { MessageMapper } from './message.mapper';
import { ParticipantMapper } from './participant.mapper';

@Injectable({
  providedIn: 'root',
})
export class ConversationMapper {
  constructor(
    private participantMapper: ParticipantMapper,
    private messageMapper: MessageMapper,
  ) { }

  toDomain(dto: ConversationEntityDTO): ConversationEntity {
    return new ConversationEntity({
      id: dto.id,
      title: dto.title,
      type: dto.type,
      participants: dto.participants?.map((p) => this.participantMapper.toDomain(p)) || [],
      messages: dto.messages?.map((m) => this.messageMapper.toDomain(m)) || [],
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      isActive: dto.isActive,
    });
  }

  toDTO(entity: ConversationEntity): ConversationEntityDTO {
    return {
      id: entity.id,
      title: entity.title,
      type: entity.type,
      participants: entity.participants?.map((p) => this.participantMapper.toDTO(p)) || [],
      messages: entity.messages?.map((m) => this.messageMapper.toDTO(m)) || [],
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      isActive: entity.isActive,
    };
  }
}
