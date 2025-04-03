import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMessageRepository } from '../../../core/interfaces/repositorys/chat/i-message.repository';
import { IMessageDatasource } from '../../../core/interfaces/datasource/auth/i-message-datasource';
import { Inject } from '@angular/core'; 
import { MessageEntity } from '../../../core/domain/entities/chat/message-entity';
import { MessageMapper } from '../../mappers/message.mapper';

@Injectable({
  providedIn: 'root',
})
export class MessageRepository implements IMessageRepository {
  constructor(
    @Inject(IMessageDatasource)
    private dataSource: IMessageDatasource,
    private mapper: MessageMapper,
  ) { }

  getMessages(): Observable<MessageEntity[]> {
    return this.dataSource
      .getMessages()
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.toDomain(dto))));
  }

  getMessage(id: string): Observable<MessageEntity> {
    return this.dataSource.getMessage(id).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  sendMessage(message: MessageEntity): Observable<MessageEntity> {
    const dto = this.mapper.toDTO(message);
    return this.dataSource.sendMessage(dto).pipe(map((dto) => this.mapper.toDomain(dto)));
  }
}
