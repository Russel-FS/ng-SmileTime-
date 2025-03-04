import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatSidebarComponent } from '../../../../shared/components/chat/chat-sidebar/chat-sidebar.component';
import { ContactMessage } from '../../../../core/domain/models/contact-message';
import { Message } from '../../../../core/domain/models/messages';
import { ChatMessagesComponent } from '../../../../shared/components/chat/chat-messages/chat-messages.component';
import { ChatHeaderComponent } from '../../../../shared/components/chat/chat-header/chat-header.component';
import { SendMessageUseCase } from '../../../../core/use-cases/send-message-use-case';
import { IMessageRepository } from '../../../../core/interfaces/message.repository';
import { MessageRepository } from '../../../../data/repositories/message.repository';
import { GetMessagesUseCase } from '../../../../core/use-cases/get-messages-use-case';

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
  providers: [
    GetMessagesUseCase,
    {
      provide: IMessageRepository,
      useClass: MessageRepository,
    },
    SendMessageUseCase,
    {
      provide: IMessageRepository,
      useClass: MessageRepository,
    },
  ],
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css'],
})
export class ClientChatComponent implements OnInit {
  constructor(
    private getMessagesUseCase: GetMessagesUseCase,
    private sendMessageUseCase: SendMessageUseCase,
  ) {}

  contactSelected!: ContactMessage;
  messages: Message[] = [];

  contacts: ContactMessage[] = [
    {
      id: 1,
      name: 'Flores',
      role: 'Dentista',
      avatar: 'icons/user-profile.svg',
      isOnline: true,
      isTyping: false,
      lastMessage: 'ultima vez, 10:00',
      unread: 2,
      isSelected: true,
    },
    {
      id: 2,
      name: 'James',
      role: 'Dentista',
      avatar: 'icons/user-profile.svg',
      isOnline: false,
      isTyping: false,
      lastMessage: 'ultima vez, 10:00',
      unread: 0,
      isSelected: false,
    },
    {
      id: 3,
      name: 'Mallca',
      role: 'soperte',
      avatar: 'icons/user-profile.svg',
      isOnline: true,
      isTyping: false,
      lastMessage: 'ultima vez, 10:00',
      unread: 1,
      isSelected: false,
    },
  ];

  ngOnInit(): void {
    this.initData();
  }
  onContactClick(contact: ContactMessage) {
    this.contacts.forEach((c) => (c.isSelected = false));
    contact.isSelected = true;
    contact.unread = 0;
    this.contactSelected = contact;
  }

  onGetMessages(contact: ContactMessage) {}
  initData() {
    // obtener mensajes
    this.getMessagesUseCase.execute().subscribe((messages) => {
      this.messages = messages;
    });
  }
  onSendMessage(newMessage: string): void {
    if (newMessage.trim()) {
      // marcar como escribiendo
      const activeContact = this.contacts.find((c) => c.isSelected);
      if (activeContact) activeContact.isTyping = true;

      this.messages.push({ text: newMessage, isUser: true, timestamp: new Date() });

      // enviar mensaje
      this.sendMessageUseCase.execute(new Message(newMessage, true, new Date(), 2)).subscribe();
      // simular respuesta
      setTimeout(() => {
        if (activeContact) activeContact.isTyping = false;
        this.messages.push({
          text: '¡Claro! ¿En qué puedo ayudarte?',
          isUser: false,
          timestamp: new Date(),
        });
      }, 2000);
    }
  }
}
