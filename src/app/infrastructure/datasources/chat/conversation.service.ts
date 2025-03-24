import { Injectable } from '@angular/core';
import { IConversationDatasource } from '../../../core/interfaces/datasource/chat/i-conversation-datasource';
import { catchError, Observable, of, tap } from 'rxjs';
import { ConversationEntityDTO } from '../../../data/dto/conversation-entity-DTO';
import { mockConversation } from '../../../core/domain/model/chat/__mocks__/conversation.mock';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../config/app.config';
import { StorageService } from '../../../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService implements IConversationDatasource {

  constructor(
    private http: HttpClient,
    private apiUrl: ApiConfig,
    private storage: StorageService,
  ) { }

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
    throw new Error('Method not implemented.');
  }
  getConversationById(id: string | number): Observable<ConversationEntityDTO> {
    const headers = this.storage.getAuthHeaders();
    const url = `${this.apiUrl.getEndpoint('chat', 'conversation')}/${id}`;
    return this.http.get<ConversationEntityDTO>(url, { headers });
  }
}
