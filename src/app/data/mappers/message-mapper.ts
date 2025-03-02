import { Injectable } from '@angular/core';
import { Message } from '../../core/domain/models/message.model';
import { MessageDTO } from '../dto/messageDTO';

@Injectable({
    providedIn: 'root'
})
export class MessageMapper {
    toModel(dto: MessageDTO): Message {
        return new Message(
            dto.id,
            dto.message,
            dto.time
        );
    }

    toDTO(model: Message): MessageDTO {
        return {
            id: model.id,
            message: model.message,
            time: model.time
        };
    }
}
