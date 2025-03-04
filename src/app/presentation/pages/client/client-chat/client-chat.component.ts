import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatSidebarComponent } from '../../../../shared/components/chat/chat-sidebar/chat-sidebar.component';
import { ContactMessage } from '../../../../core/domain/models/contact-message';
import { Message } from '../../../../core/domain/models/messages';
import { ChatMessagesComponent } from '../../../../shared/components/chat/chat-messages/chat-messages.component';
import { ChatHeaderComponent } from '../../../../shared/components/chat/chat-header/chat-header.component';

@Component({
  selector: 'app-client-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChatSidebarComponent,
    ChatMessagesComponent,
    ChatHeaderComponent,
  ],
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css'],
})
export class ClientChatComponent {
  contactSelected!: ContactMessage;
  messages: Message[] = [
    { text: 'Hola Dr. Flores Solano, ¿en que puedo ayudar?', isUser: false, timestamp: new Date() },
  ];
  isTyping: boolean = false;

  contacts: ContactMessage[] = [
    {
      id: 1,
      name: 'Flores',
      role: 'Dentista',
      avatar: 'icons/user-profile.svg',
      status: 'online',
      lastMessage: 'ultima vez, 10:00',
      unread: 2,
      isActive: true,
    },
    {
      id: 2,
      name: 'James',
      role: 'Dentista',
      avatar: 'icons/user-profile.svg',
      status: 'offline',
      lastMessage: 'ultima vez, 10:00',
      unread: 0,
    },
    {
      id: 3,
      name: 'Mallca',
      role: 'soperte',
      avatar: 'icons/user-profile.svg',
      status: 'online',
      lastMessage: 'ultima vez, 10:00',
      unread: 1,
    },
  ];

  onContactClick(contact: ContactMessage) {
    this.contacts.forEach((c) => (c.isActive = false));
    contact.isActive = true;
    contact.unread = 0;
    this.contactSelected = contact;
  }

  onSendMessage(newMessage: string): void {
    if (newMessage.trim()) {
      // marcar como escribiendo
      const activeContact = this.contacts.find((c) => c.isActive);
      if (activeContact) activeContact.status = 'typing';

      // agregar mensaje
      this.messages.push({
        text: newMessage,
        isUser: true,
        timestamp: new Date(),
      });

      // simular respuesta
      setTimeout(() => {
        if (activeContact) activeContact.status = 'online';
        this.messages.push({
          text: '¡Claro! ¿En qué puedo ayudarte?',
          isUser: false,
          timestamp: new Date(),
        });
      }, 2000);
    }
  }
}
