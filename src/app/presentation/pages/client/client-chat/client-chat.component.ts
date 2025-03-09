import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatSidebarComponent } from '../../../../shared/components/chat/chat-sidebar/chat-sidebar.component';
import { Message } from '../../../../core/domain/models/messages';
import { ChatMessagesComponent } from '../../../../shared/components/chat/chat-messages/chat-messages.component';
import { ChatHeaderComponent } from '../../../../shared/components/chat/chat-header/chat-header.component';
import { IMessageRepository } from '../../../../core/interfaces/i-message.repository';
import { MessageRepository } from '../../../../data/repositories/message.repository';
import { GetMessagesUseCase } from '../../../../core/use-cases/get-messages-use-case';
import { GetContactsUseCase } from '../../../../core/use-cases/get-contacts-use-case';
import { Contact } from '../../../../core/domain/models/contact';
import { IContactRepository } from '../../../../core/interfaces/IContactRepository';
import { ContactRepository } from '../../../../data/repositories/contact.repository';
import { ContactDataSource } from '../../../../infrastructure/datasources/api-contact.datasource';
import { IContactDatasource } from '../../../../core/interfaces/IContactDatasource';
import { MessageDataSource } from '../../../../infrastructure/datasources/message.datasource';
import { IMessageDatasource } from '../../../../core/interfaces/i-message-datasource';
import { SignalRService } from '../../../../core/services/signal-r.service';
import { IRealTimeComunication } from '../../../../core/interfaces/i-real-time-comunication';
import { ManageRealtimeMessageUseCase } from '../../../../core/use-cases/manage-realtime-message-use-case';
import { ManageTypingStatusUseCase } from '../../../../core/use-cases/manage-typing-status-use-case';

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
    GetContactsUseCase,
    ManageRealtimeMessageUseCase,
    ManageTypingStatusUseCase,
    {
      provide: IRealTimeComunication,
      useClass: SignalRService,
    },
    {
      provide: IMessageRepository,
      useClass: MessageRepository,
    },
    {
      provide: IContactRepository,
      useClass: ContactRepository,
    },
    {
      provide: IContactDatasource,
      useClass: ContactDataSource,
    },
    {
      provide: IMessageDatasource,
      useClass: MessageDataSource,
    },
  ],
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css'],
})
export class ClientChatComponent implements OnInit, OnDestroy {
  constructor(
    private getMessagesUseCase: GetMessagesUseCase,
    private getContactsUseCase: GetContactsUseCase,
    private manageRealTimeMessages: ManageRealtimeMessageUseCase,
    private manageTypingStatus: ManageTypingStatusUseCase,
  ) {}

  contactSelected!: Contact;
  messages: Message[] = [];
  contacts: Contact[] = [];

  ngOnInit(): void {
    this.initData();
    this.initRealTimeCommunication();
  }

  ngOnDestroy(): void {
    this.manageRealTimeMessages.closeConnection();
  }

  onContactClick(contact: Contact) {
    this.contacts.forEach((c) => (c.isSelected = false));
    contact.isSelected = true;
    contact.unread = 0;
    this.contactSelected = contact;
  }

  initData() {
    // obtener contactos
    this.getContactsUseCase.execute().subscribe((contacts) => {
      this.contacts = contacts;
    });
    // obtener contacto seleccionado
    const selectedContact = this.contacts.find((c) => c.isSelected);
    if (selectedContact) {
      this.contactSelected = selectedContact;
    }
    // obtener mensajes
    this.getMessagesUseCase.execute().subscribe((messages) => {
      this.messages = messages;
    });
  }

  private initRealTimeCommunication(): void {
    this.manageRealTimeMessages.initializeConnection();
    this.listenForMessages();
    this.listenForTypingStatus();
  }
  onTyping(text: string): void {
    if (this.contactSelected) {
      this.manageTypingStatus.notifyTyping(this.contactSelected.id.toString(), text);
    }
  }

  onSendMessage(newMessage: string): void {
    if (newMessage.trim() && this.contactSelected) {
      const message = new Message(newMessage, true, new Date());
      this.messages.push(message);

      this.manageRealTimeMessages.sendMessage(message).subscribe({
        next: () => {
          this.manageTypingStatus.notifyTyping(this.contactSelected.id.toString(), '');
        },
        error: (error) => {
          console.error('Error enviando mensaje:', error);
          this.manageTypingStatus.notifyTyping(this.contactSelected.id.toString(), '');
        },
      });
    }
  }

  listenForMessages() {
    this.manageRealTimeMessages.listenForMessages().subscribe({
      next: (message) => {
        this.messages.push(message);
        if (this.contactSelected) {
          this.contactSelected.isTyping = false;
        }
      },
      error: (error) => console.error('Error recibiendo mensajes:', error),
    });
  }

  private listenForTypingStatus(): void {
    this.manageTypingStatus.listenTypingStatus().subscribe({
      next: ({ userId, isTyping }) => {
        const contact = this.contacts.find((c) => userId.includes(c.id.toString()));
        if (contact) {
          contact.isTyping = isTyping;
        }
      },
      error: (error) => console.error('Error recibiendo estado de typing:', error),
    });
  }
}
