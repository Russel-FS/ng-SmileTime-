import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMessageRepository } from '../../core/interfaces/message.repository';
import { MessageMapper } from '../mappers/message-mapper';
import { Message } from '../../core/domain/models/messages';
import { IMessageDatasource } from '../../core/interfaces/i-message-datasource';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageRepository implements IMessageRepository {
  constructor(
    @Inject(IMessageDatasource)
    private dataSource: IMessageDatasource,
    private mapper: MessageMapper,
  ) {}

  getMessages(): Observable<Message[]> {
    return this.dataSource
      .getMessages()
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.toModel(dto))));
  }

  getMessage(id: string): Observable<Message> {
    return this.dataSource.getMessage(id).pipe(map((dto) => this.mapper.toModel(dto)));
  }

  sendMessage(message: Message): Observable<Message> {
    const dto = this.mapper.toDTO(message); 
    return this.dataSource.sendMessage(dto).pipe(map((dto) => this.mapper.toModel(dto)));
  }
}
