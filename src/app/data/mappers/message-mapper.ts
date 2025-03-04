import { Injectable } from '@angular/core';
import { MessageDTO } from '../dto/messageDTO';
import { Message } from '../../core/domain/models/messages';

@Injectable({
  providedIn: 'root',
})
export class MessageMapper {
  toModel(dto: MessageDTO): Message {
    return new Message(dto.message, false, dto.time, dto.id);
  }

  toDTO(model: Message): MessageDTO {
    return {
      id: model.id || 0,
      message: model.text,
      time: model.timestamp,
    };
  }
}
