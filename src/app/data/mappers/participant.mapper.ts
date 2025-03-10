import { Injectable } from '@angular/core';
import { ConversationParticipant } from '../../core/domain/model/chat/conversation-participant';
import { ConversationParticipantDTO } from '../dto/conversation-participant-DTO';

@Injectable({
  providedIn: 'root',
})
export class ParticipantMapper {
  toDomain(dto: ConversationParticipantDTO): ConversationParticipant {
    return new ConversationParticipant(dto.userId, dto.userName, dto.joinedAt, dto.leftAt);
  }

  toDTO(entity: ConversationParticipant): ConversationParticipantDTO {
    return {
      userId: entity.userId,
      userName: entity.userName,
      joinedAt: entity.joinedAt,
      leftAt: entity.leftAt,
    };
  }
}
