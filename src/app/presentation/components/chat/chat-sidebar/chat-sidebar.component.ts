import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { UserEntity, UserRole } from '../../../../core/domain/entities/chat/user-entity';
import { CommonModule } from '@angular/common';
import { ConversationParticipant } from '../../../../core/domain/entities/chat/conversation-participant';

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
    trigger('loadingState', [
      transition(':leave', [
        query('.skeleton', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-20px)' }))
          ])
        ], { optional: true })
      ]),
      transition(':enter', [
        query('.skeleton', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
})
export class ChatSidebarComponent {
  searchQuery: string = '';
  @Input() contacts: ConversationParticipant[] = [];
  @Input() isLoading: boolean = true; // nueva propiedad
  @Output() contactClick = new EventEmitter<ConversationParticipant>();

  onContactClick(contact: ConversationParticipant): void {
    this.contactClick.emit(contact);
  }

  get filteredContacts(): ConversationParticipant[] {
    return this.contacts.filter((contact) =>
      contact.userName.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  getInitials(userName: string): string {
    if (!userName) return '?';

    const names = userName.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  }
}
