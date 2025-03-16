import { Observable } from "rxjs";
import { ConversationEntityDTO } from "../../../../data/dto/conversation-entity-DTO";
import { InjectionToken } from "@angular/core";

export interface IConversationDatasource {
    getByUserId(userId: number | string): Observable<ConversationEntityDTO[]>;
    create(conversation: ConversationEntityDTO): Observable<ConversationEntityDTO>;
    update(id: string | number, conversation: Partial<ConversationEntityDTO>): Observable<ConversationEntityDTO>;
    getConversationByParticipants(userId: number | string, contactId: number | string): Observable<ConversationEntityDTO>;
    getConversationById(id: number | string): Observable<ConversationEntityDTO>;

}

export const IConversationDatasource = new InjectionToken<IConversationDatasource>('IConversationDatasource');