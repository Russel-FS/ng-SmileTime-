import { Injectable } from "@angular/core";
import { IConversationRepository } from "../../core/interfaces/repositorys/chat/i-conversation-repository";
import { map, Observable } from "rxjs";
import { ConversationEntity } from "../../core/domain/model/chat/conversation-entity";
import { ConversationMapper } from "../mappers/conversation.mapper";
import { ConversationService } from "../../infrastructure/datasources/conversation.service";
import { IConversationDatasource } from "../../core/interfaces/datasource/chat/i-conversation-datasource";

@Injectable({
    providedIn: 'root',
})
export class ConversationRepository implements IConversationRepository {
    constructor(
        private conversationDatasource: IConversationDatasource,
        private conversationMapper: ConversationMapper,
    ) { }
    getByUserId(userId: number | string): Observable<ConversationEntity[]> {
        return this.conversationDatasource.getByUserId(userId)
            .pipe(
                map(
                    (dto) => dto.map((conversation) => this.conversationMapper.toDomain(conversation))
                ));
    }
    create(conversation: ConversationEntity): Observable<ConversationEntity> {
        return this.conversationDatasource.create(this.conversationMapper.toDTO(conversation))
            .pipe(
                map(
                    (dto) => this.conversationMapper.toDomain(dto)
                ));
    }
    update(id: number | string, conversation: Partial<ConversationEntity>): Observable<ConversationEntity> {
        return this.conversationDatasource.update(id, this.conversationMapper.toDTO(conversation))
            .pipe(
                map(
                    (dto) => this.conversationMapper.toDomain(dto)
                ));
    }
    getConversationByParticipants(userId: number | string, contactId: number | string): Observable<ConversationEntity> {
        return this.conversationDatasource.getConversationByParticipants(userId, contactId)
            .pipe(
                map(
                    (dto) => this.conversationMapper.toDomain(dto)
                ));
    }
    getConversationById(id: number | string): Observable<ConversationEntity> {
        return this.conversationDatasource.getConversationById(id)
            .pipe(
                map(
                    (dto) => this.conversationMapper.toDomain(dto)
                ));
    }

}
