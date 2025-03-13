import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserEntity, UserRole } from '../../../../core/domain/model/chat/user-entity';
import { CommonModule } from '@angular/common';
import { ConversationParticipant } from '../../../../core/domain/model/chat/conversation-participant';

@Component({
  selector: 'app-chat-sidebar',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ],
})
export class ChatSidebarComponent {
  searchQuery: string = '';
  @Input() contacts: ConversationParticipant[] = [];
  @Output() contactClick = new EventEmitter<ConversationParticipant>();

  onContactClick(contact: ConversationParticipant): void {
    this.contactClick.emit(contact);
  }

  get filteredContacts(): ConversationParticipant[] {
    return this.contacts.filter((contact) =>
      contact.userName.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }
}
