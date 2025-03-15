import { Injectable } from '@angular/core';
import { IConversationDatasource } from '../../core/interfaces/datasource/chat/i-conversation-datasource';
import { Observable } from 'rxjs';
import { ConversationEntityDTO } from '../../data/dto/conversation-entity-DTO';
import { mockConversation } from '../../core/domain/model/chat/__mocks__/conversation.mock';

@Injectable({
  providedIn: 'root'
})
export class ConversationService implements IConversationDatasource {

  constructor() { }
  getByUserId(userId: number | string): Observable<ConversationEntityDTO[]> {
    throw new Error('Method not implemented.');
  }
  create(conversation: ConversationEntityDTO): Observable<ConversationEntityDTO> {
    throw new Error('Method not implemented.');
  }
  update(id: number | string, conversation: Partial<ConversationEntityDTO>): Observable<ConversationEntityDTO> {
    throw new Error('Method not implemented.');
  }
  getConversationByParticipants(userId: number | string, contactId: number | string): Observable<ConversationEntityDTO> {
    return new Observable<ConversationEntityDTO>(observer => {
      observer.next(mockConversation);
      observer.complete();
    });
  }
}
