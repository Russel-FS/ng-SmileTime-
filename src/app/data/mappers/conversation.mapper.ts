import { Injectable } from '@angular/core';
import { ConversationEntity } from '../../core/domain/model/chat/conversation-entity';
import { ConversationEntityDTO } from '../dto/conversation-entity-DTO';
import { MessageMapper } from './message.mapper';
import { ParticipantMapper } from './participant.mapper';

@Injectable({
  providedIn: 'root',
})
export class ConversationMapper {
  constructor(private participantMapper: ParticipantMapper) {}
  toDomain(dto: ConversationEntityDTO): ConversationEntity {
    return new ConversationEntity(
      dto.id,
      dto.type,
      dto.participants.map((p) => this.participantMapper.toDomain(p)),
      dto.lastMessage,
      dto.createdAt,
      dto.updatedAt,
      dto.isActive,
    );
  }

  toDTO(entity: ConversationEntity): ConversationEntityDTO {
    return {
      id: entity.id,
      type: entity.type,
      participants: entity.participants.map((p) => this.participantMapper.toDTO(p)),
      lastMessage: entity.lastMessage,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      isActive: entity.isActive,
    };
  }
}
