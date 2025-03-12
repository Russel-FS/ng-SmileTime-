import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { MessageEntity } from '../../domain/model/chat/message-entity';
import { ConversationEntity } from '../../domain/model/chat/conversation-entity';
import { IConversationRepository } from '../../interfaces/repositorys/chat/i-conversation-repository';

@Injectable({
    providedIn: 'root',
})
export class GetMessagesUseCase {
    constructor(@Inject(IConversationRepository) private conversationRepository: IConversationRepository) { }

    createConversation(conversation: ConversationEntity): Observable<ConversationEntity> {
        return this.conversationRepository.create(conversation);
    }
    getByUserId(id: string | number): Observable<ConversationEntity[]> {
        return this.conversationRepository.getByUserId(id);
    }
    getConversationByParticipants(idUser: number | string, contactId: number | string): Observable<ConversationEntity> {
        return this.conversationRepository.getConversationByParticipants(idUser, contactId);
    }

    update(idUser: number | string, conversation: ConversationEntity): Observable<ConversationEntity> {
        return this.conversationRepository.update(idUser, conversation);
    }
}