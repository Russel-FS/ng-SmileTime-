import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMessageRepository } from '../../../core/interfaces/repositorys/chat/i-message.repository';
import { IMessageDatasource } from '../../../core/interfaces/datasource/auth/i-message-datasource';
import { Inject } from '@angular/core';
import { ConversationEntity } from '../../../core/domain/model/chat/conversation-entity';
import { ConversationMapper } from '../../mappers/conversation.mapper';
import { MessageEntity } from '../../../core/domain/model/chat/message-entity';
import { MessageMapper } from '../../mappers/message.mapper';

@Injectable({
  providedIn: 'root',
})
export class MessageRepository implements IMessageRepository {
  constructor(
    @Inject(IMessageDatasource)
    private dataSource: IMessageDatasource,
    private mapper: MessageMapper,
    private converMapper: ConversationMapper
  ) { }

  getMessages(): Observable<MessageEntity[]> {
    return this.dataSource
      .getMessages()
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.toDomain(dto))));
  }

  getMessage(id: string): Observable<MessageEntity> {
    return this.dataSource.getMessage(id).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  sendMessage(message: MessageEntity): Observable<ConversationEntity> {
    const dto = this.mapper.toDTO(message);
    return this.dataSource.sendMessage(dto).pipe(map((dto) => this.converMapper.toDomain(dto)));
  }
}
