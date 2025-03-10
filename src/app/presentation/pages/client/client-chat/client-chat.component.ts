import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatSidebarComponent } from '../../../components/chat/chat-sidebar/chat-sidebar.component';
import { ChatMessagesComponent } from '../../../components/chat/chat-messages/chat-messages.component';
import { ChatHeaderComponent } from '../../../components/chat/chat-header/chat-header.component';
import { IMessageRepository } from '../../../../core/interfaces/repositorys/chat/i-message.repository';
import { MessageRepository } from '../../../../data/repositories/message.repository';
import { GetMessagesUseCase } from '../../../../core/use-cases/chat/get-messages-use-case';
import { GetContactsUseCase } from '../../../../core/use-cases/chat/get-contacts-use-case';
import { ContactRepository } from '../../../../data/repositories/userContact.repository';
import { ContactDataSource } from '../../../../infrastructure/datasources/api-contact.datasource';
import { MessageDataSource } from '../../../../infrastructure/datasources/message.datasource';
import { IMessageDatasource } from '../../../../core/interfaces/datasource/auth/i-message-datasource';
import { SignalRService } from '../../../../core/services/signal-r.service';
import { IRealTimeComunication } from '../../../../core/interfaces/signalR/i-real-time-comunication';
import { ManageRealtimeMessageUseCase } from '../../../../core/use-cases/signalR/manage-realtime-message-use-case';
import { ManageTypingStatusUseCase } from '../../../../core/use-cases/chat/manage-typing-status-use-case';
import { UserEntity } from '../../../../core/domain/model/chat/user-entity';
import { IUserRepository } from '../../../../core/interfaces/repositorys/chat/i-user-repository';
import { IUserDatasource } from '../../../../core/interfaces/datasource/chat/I-user-datasource';
import { MessageEntity, MessageType } from '../../../../core/domain/model/chat/message-entity';
import { map } from 'rxjs';
import {
  ConversationEntity,
  ConversationType,
} from '../../../../core/domain/model/chat/conversation-entity';
import { join } from 'path';
import { ConversationParticipant } from '../../../../core/domain/model/chat/conversation-participant';
import { MessageStatus, Status } from '../../../../core/domain/model/chat/message-status';

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
      provide: IUserRepository,
      useClass: ContactRepository,
    },
    {
      provide: IUserDatasource,
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

  contactSelected!: UserEntity;
  messages: MessageEntity[] = [];
  contacts: UserEntity[] = [];
  isTyping: boolean = false;

  ngOnInit(): void {
    this.initData();
    this.initRealTimeCommunication();
  }

  ngOnDestroy(): void {
    this.manageRealTimeMessages.closeConnection();
  }

  onContactClick(contact: UserEntity): void {
    this.contacts.forEach((c) => (c.isActive = false));
    contact.isActive = true;
    this.contactSelected = contact;
  }

  initData() {
    // obtener contactos
    this.getContactsUseCase.execute().subscribe((contacts) => {
      this.contacts = contacts;
    });
    // obtener contacto seleccionado
    const selectedContact = this.contacts.find((c) => c.isActive);
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
      const sender = new ConversationParticipant(
        1,
        'Usuario Actual',
        new Date(),
        undefined,
        'assets/images/avatar.png',
      );
      const receiver = new ConversationParticipant(
        this.contactSelected.id,
        this.contactSelected.username,
        new Date(),
      );
      const conversation = new ConversationEntity(
        crypto.randomUUID(),
        ConversationType.INDIVIDUAL,
        [sender, receiver],
        undefined,
        new Date(),
        new Date(),
        true,
      );

      const message = new MessageEntity(
        crypto.randomUUID(),
        conversation,
        sender,
        newMessage,
        MessageType.TEXT,
        new MessageStatus(this.contactSelected.id.toString(), Status.SENT, new Date()),
        new Date(),
        undefined,
        [],
        false,
      );

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
      },
      error: (error) => console.error('Error recibiendo mensajes:', error),
    });
  }

  private listenForTypingStatus(): void {
    this.manageTypingStatus.listenTypingStatus().subscribe({
      next: ({ userId, isTyping }) => {
        const contact = this.contacts.find((c) => userId.includes(c.id.toString()));
        if (contact) {
          this.isTyping = isTyping;
        }
      },
      error: (error) => console.error('Error recibiendo estado de typing:', error),
    });
  }

  private loadMessages(): void {}
}
