import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../domain/models/message.model';
import { IMessageRepository,  } from '../interfaces/message.repository';

@Injectable({
    providedIn: 'root'
})
export class MessageUseCase {

    constructor(@Inject(IMessageRepository)
        private messageRepository: IMessageRepository) {}

    getMessages(): Observable<Message[]> {
        return this.messageRepository.getMessages();
    }

    getMessage(id: string): Observable<Message> {
        return this.messageRepository.getMessage(id);
    }

    createMessage(message: Message): Observable<Message> {
        return this.messageRepository.createMessage(message);
    }
 
}
