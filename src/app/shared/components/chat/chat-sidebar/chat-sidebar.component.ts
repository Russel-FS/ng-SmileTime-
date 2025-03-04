import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactMessage } from '../../../../core/domain/models/contact-message';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-chat-sidebar',
  imports: [FormsModule],
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
  @Input() contacts: ContactMessage[] = [];
  @Output() contactClick = new EventEmitter<ContactMessage>();

  onContactClick(contact: ContactMessage): void {
    this.contactClick.emit(contact);
  }

  get filteredContacts(): ContactMessage[] {
    return this.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }
}
