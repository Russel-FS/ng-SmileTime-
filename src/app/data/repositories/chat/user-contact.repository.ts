import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUserRepository } from '../../../core/interfaces/repositorys/chat/i-user-repository';
import { IUserDatasource } from '../../../core/interfaces/datasource/chat/I-user-datasource';
import { ConversationParticipant } from '../../../core/domain/model/chat/conversation-participant';
import { ParticipantMapper } from '../../mappers/participant.mapper';

@Injectable({
  providedIn: 'root',
})
export class ContactRepository implements IUserRepository {
  constructor(
    @Inject(IUserDatasource)
    private dataSource: IUserDatasource,
    private mapper: ParticipantMapper,
  ) { }

  getContacts(): Observable<ConversationParticipant[]> {
    return this.dataSource
      .getContacts()
      .pipe(map((dtos) => dtos.map((dto) => this.mapper.toDomain(dto))));
  }

  getContact(id: string): Observable<ConversationParticipant> {
    return this.dataSource.getContact(id).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  createContact(contact: ConversationParticipant): Observable<ConversationParticipant> {
    const dto = this.mapper.toDTO(contact);
    return this.dataSource.createContact(dto).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  updateContact(contact: ConversationParticipant): Observable<ConversationParticipant> {
    const dto = this.mapper.toDTO(contact);
    return this.dataSource.updateContact(dto).pipe(map((dto) => this.mapper.toDomain(dto)));
  }

  deleteContact(id: string): Observable<void> {
    return this.dataSource.deleteContact(id);
  }
}
