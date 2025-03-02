import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Message } from '../../core/domain/models/message.model';
import { IMessageRepository } from '../../core/interfaces/message.repository';
import { MessageDataSource } from '../datasources/message.datasource';
import { MessageMapper } from '../mappers/message-mapper';

@Injectable({
  providedIn: 'root',
})
export class MessageRepository implements IMessageRepository {
  constructor(private dataSource: MessageDataSource, private mapper: MessageMapper) {}

  getMessages(): Observable<Message[]> {
    return this.dataSource
      .getMessages()
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.toModel(dto))));
  }

  getMessage(id: string): Observable<Message> {
    return this.dataSource.getMessage(id).pipe(map((dto) => this.mapper.toModel(dto)));
  }

  createMessage(message: Message): Observable<Message> {
    const dto = this.mapper.toDTO(message);
    return this.dataSource.createMessage(dto).pipe(map((dto) => this.mapper.toModel(dto)));
  }
}
