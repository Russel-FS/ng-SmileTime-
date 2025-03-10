import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../../domain/model/chat/user-entity';
import { IUserRepository } from '../../interfaces/repositorys/chat/i-user-repository';

@Injectable({
  providedIn: 'root',
})
export class GetContactsUseCase {
  constructor(@Inject(IUserRepository) private contactRepository: IUserRepository) {}

  execute(): Observable<UserEntity[]> {
    return this.contactRepository.getContacts();
  }
}
