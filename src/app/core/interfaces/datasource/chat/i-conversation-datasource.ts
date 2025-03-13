import { Observable } from "rxjs";
import { ConversationEntityDTO } from "../../../../data/dto/conversation-entity-DTO";

export interface IConversationDatasource {
    getByUserId(userId: number): Observable<ConversationEntityDTO[]>;
    create(conversation: ConversationEntityDTO): Observable<ConversationEntityDTO>;
    update(id: string, conversation: Partial<ConversationEntityDTO>): Observable<ConversationEntityDTO>;
    getConversationByParticipants(userId: number, contactId: number): Observable<ConversationEntityDTO>;
}
