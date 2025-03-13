import { Injectable } from "@angular/core";
import { IConversationRepository } from "../../core/interfaces/repositorys/chat/i-conversation-repository";
import { Observable } from "rxjs";
import { ConversationEntity } from "../../core/domain/model/chat/conversation-entity";
import { ConversationMapper } from "../mappers/conversation.mapper";

@Injectable({
    providedIn: 'root',
})
export class ConversationRepository implements IConversationRepository {
    constructor(
        private conversationMapper: ConversationMapper,
    ) { }
    getByUserId(userId: number | string): Observable<ConversationEntity[]> {
        throw new Error("Method not implemented.");
    }
    create(conversation: ConversationEntity): Observable<ConversationEntity> {
        throw new Error("Method not implemented.");
    }
    update(id: number | string, conversation: Partial<ConversationEntity>): Observable<ConversationEntity> {
        throw new Error("Method not implemented.");
    }
    getConversationByParticipants(userId: number | string, contactId: number | string): Observable<ConversationEntity> {
        throw new Error("Method not implemented.");
    }

}
