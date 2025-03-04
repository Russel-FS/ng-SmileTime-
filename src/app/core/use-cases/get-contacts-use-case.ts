import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContactRepository } from '../interfaces/IContactRepository';
import { Contact } from '../domain/models/contact';

@Injectable({
  providedIn: 'root',
})
export class GetContactsUseCase {
  constructor(@Inject(IContactRepository) private contactRepository: IContactRepository) {}

  execute(): Observable<Contact[]> {
    return this.contactRepository.getContacts();
  }
}
