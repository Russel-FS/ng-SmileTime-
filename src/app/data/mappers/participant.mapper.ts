import { Injectable } from '@angular/core';
import { ConversationParticipant } from '../../core/domain/model/chat/conversation-participant';
import { ConversationParticipantDTO } from '../dto/conversation-participant-DTO';
import { createMapper, Mapper } from '@automapper/core';
import { classes } from '@automapper/classes';

@Injectable({
  providedIn: 'root',
})
export class ParticipantMapper {

  toDomain(dto: ConversationParticipantDTO): ConversationParticipant {
    return new ConversationParticipant({
      userId: dto.userId,
      userName: dto.userName,
      avatar: dto.avatar,
      lastActive: dto.lastActive,
      joinedAt: dto.joinedAt,
      leftAt: dto.leftAt,
      selected: dto.selected,
      role: dto.role,
      isOnline: dto.isOnline
    });
  }

  toDTO(entity: ConversationParticipant): ConversationParticipantDTO {
    return {
      userId: entity.userId,
      userName: entity.userName,
      avatar: entity.avatar,
      lastActive: entity.lastActive,
      joinedAt: entity.joinedAt,
      leftAt: entity.leftAt,
      selected: entity.selected,
      role: entity.role,
      isOnline: entity.isOnline
    };
  }
}
