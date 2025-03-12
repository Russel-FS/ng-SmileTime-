import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMessageRepository } from '../../core/interfaces/repositorys/chat/i-message.repository';
import { IMessageDatasource } from '../../core/interfaces/datasource/auth/i-message-datasource';
import { Inject } from '@angular/core';
import { ConversationEntity } from '../../core/domain/model/chat/conversation-entity';
import { ConversationMapper } from '../mappers/conversation.mapper';

@Injectable({
  providedIn: 'root',
})
export class MessageRepository implements IMessageRepository {
  constructor(
    @Inject(IMessageDatasource)
    private dataSource: IMessageDatasource,
    private mapper: ConversationMapper,
  ) { }

  getMessages(): Observable<ConversationEntity[]> {
    return this.dataSource
      .getMessages()
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.toDomain(dto))));
  }

  getMessage(id: string): Observable<ConversationEntity> {
    return this.dataSource.getMessage(id).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  sendMessage(message: ConversationEntity): Observable<ConversationEntity> {
    const dto = this.mapper.toDTO(message);
    return this.dataSource.sendMessage(dto).pipe(map((dto) => this.mapper.toDomain(dto)));
  }
}
