import { Injectable } from '@angular/core';
import { ContactDTO } from '../dto/contactDTO';
import { Contact } from '../../core/domain/models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactMapper {
  toDomain(dto: ContactDTO): Contact {
    return {
      id: dto.id,
      name: dto.name,
      role: dto.role,
      avatar: dto.avatar,
      isOnline: dto.isOnline,
      isTyping: dto.isTyping,
      lastMessage: dto.lastMessage,
      unread: dto.unread,
      isSelected: dto.isSelected,
    };
  }

  toDTO(domain: Contact): ContactDTO {
    return {
      id: domain.id,
      name: domain.name,
      role: domain.role,
      avatar: domain.avatar,
      isOnline: domain.isOnline,
      isTyping: domain.isTyping,
      lastMessage: domain.lastMessage,
      unread: domain.unread,
      isSelected: domain.isSelected,
    };
  }
}
