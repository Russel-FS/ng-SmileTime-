import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatSidebarComponent } from '../../../../shared/components/chat/chat-sidebar/chat-sidebar.component';
import { Message } from '../../../../core/domain/models/messages';
import { ChatMessagesComponent } from '../../../../shared/components/chat/chat-messages/chat-messages.component';
import { ChatHeaderComponent } from '../../../../shared/components/chat/chat-header/chat-header.component';
import { SendMessageUseCase } from '../../../../core/use-cases/send-message-use-case';
import { IMessageRepository } from '../../../../core/interfaces/message.repository';
import { MessageRepository } from '../../../../data/repositories/message.repository';
import { GetMessagesUseCase } from '../../../../core/use-cases/get-messages-use-case';
import { GetContactsUseCase } from '../../../../core/use-cases/get-contacts-use-case';
import { Contact } from '../../../../core/domain/models/contact';
import { IContactRepository } from '../../../../core/interfaces/IContactRepository';
import { ContactRepository } from '../../../../data/repositories/contact.repository';

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
    SendMessageUseCase,
    {
      provide: IMessageRepository,
      useClass: MessageRepository,
    },

    GetContactsUseCase,
    {
      provide: IContactRepository,
      useClass: ContactRepository,
    },
  ],
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css'],
})
export class ClientChatComponent implements OnInit {
  constructor(
    private getMessagesUseCase: GetMessagesUseCase,
    private sendMessageUseCase: SendMessageUseCase,
    private getContactsUseCase: GetContactsUseCase,
  ) {}

  contactSelected!: Contact;
  messages: Message[] = [];
  contacts: Contact[] = [];

  ngOnInit(): void {
    this.initData();
  }

  onContactClick(contact: Contact) {
    this.contacts.forEach((c) => (c.isSelected = false));
    contact.isSelected = true;
    contact.unread = 0;
    this.contactSelected = contact;
  }

  onGetMessages(contact: Contact) {}

  initData() {
    // obtener contactos
    this.getContactsUseCase.execute().subscribe((contacts) => {
      this.contacts = contacts;
      const selectedContact = contacts.find((c) => c.isSelected);
      if (selectedContact) {
        this.contactSelected = selectedContact;
      }
    });

    // obtener mensajes
    this.getMessagesUseCase.execute().subscribe((messages) => {
      this.messages = messages;
    });
  }

  onSendMessage(newMessage: string): void {
    if (newMessage.trim()) {
      // marcar como escribiendo
      if (this.contactSelected) {
        this.contactSelected.isTyping = true;
      }

      this.messages.push({ text: newMessage, isUser: true, timestamp: new Date() });

      // enviar mensaje
      this.sendMessageUseCase.execute(new Message(newMessage, true, new Date(), 2)).subscribe();

      // simular respuesta
      setTimeout(() => {
        if (this.contactSelected) {
          this.contactSelected.isTyping = false;
        }
        this.messages.push({
          text: '¡Claro! ¿En qué puedo ayudarte?',
          isUser: false,
          timestamp: new Date(),
        });
      }, 2000);
    }
  }
}
