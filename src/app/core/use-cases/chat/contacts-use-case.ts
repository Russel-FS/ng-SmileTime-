import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../../domain/model/chat/user-entity';
import { IUserRepository } from '../../interfaces/repositorys/chat/i-user-repository';
import { ConversationParticipant } from '../../domain/model/chat/conversation-participant';

@Injectable({
  providedIn: 'root',
})
export class ContactsUseCase {
  constructor(@Inject(IUserRepository) private contactRepository: IUserRepository) { }

  execute(): Observable<ConversationParticipant[]> {
    return this.contactRepository.getContacts();
  }
}
