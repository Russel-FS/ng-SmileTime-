import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactMessage } from '../../../../core/domain/models/contact-message';

@Component({
  selector: 'app-chat-sidebar',
  imports: [FormsModule],
  templateUrl: './chat-sidebar.component.html',
  styleUrl: './chat-sidebar.component.css',
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
