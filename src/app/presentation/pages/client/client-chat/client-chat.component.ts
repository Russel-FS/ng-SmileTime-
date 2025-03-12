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
import { map, Subject, takeUntil } from 'rxjs';
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
  ) { }

  contactSelected!: UserEntity;
  contacts: UserEntity[] = [];
  isTyping: boolean = false;
  conversation: ConversationEntity[] = [];
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.initData();
    this.initRealTimeCommunication();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.manageRealTimeMessages.closeConnection();
  }

  onContactClick(contact: UserEntity): void {
    this.contacts.forEach((c) => (c.isActive = false));
    contact.isActive = true;
    this.contactSelected = contact;
  }

  initData() {
    // Obtener contactos
    this.getContactsUseCase.execute()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: contacts => {
          this.contacts = contacts;
          // Seleccionar un contacto primero
          this.contactSelected = contacts.find(c => c.isActive) || contacts[0];
        },
        error: err => console.error('Error obteniendo contactos:', err)
      });

    // Obtener conversaciones o mensajes
    this.getMessagesUseCase.execute()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: messages => this.conversation = messages,
        error: err => console.error('Error obteniendo mensajes:', err)
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
    if (!newMessage.trim() || !this.contactSelected) {
      return;
    }

    // usuario que envía el mensaje
    const sender = new ConversationParticipant({
      userId: 2,
      userName: 'Solano flores',
      avatar: 'https://example.com/avatar2.jpg'
    });

    // usuario destinatario
    const destin = new ConversationParticipant({
      userId: 1,
      userName: 'Freddy flores',
      avatar: 'https://example.com/avatar2.jpg'
    });

    // creacion del mensaje
    const message = new MessageEntity({
      id: 2,
      sender: sender,
      content: newMessage,
      type: MessageType.TEXT,
      status: [new MessageStatus(2, Status.SENT, new Date())],
      createdAt: new Date(),
      isDeleted: false
    });

    const conversation = this.MessageConversation(
      null,
      destin,
      message
    )

    // Enviar mensaje en tiempo real
    this.manageRealTimeMessages.sendMessage(conversation)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          // Notificar que el usuario dejó de escribir
          this.manageTypingStatus.notifyTyping(this.contactSelected.id.toString(), '');
        },
        error: error => {
          console.error('Error enviando mensaje:', error);
          this.manageTypingStatus.notifyTyping(this.contactSelected.id.toString(), '');
        }
      });
  }


  /**
   * crea o actualiza una conversación 
   * este metodo se encarga de buscar una conversación existente
   * si la encuentra, crea un nuevo mensaje y actualiza la conversación
   * si no la encuentra, crea una nueva conversación con el destinatario y el mensaje  
   */
  private MessageConversation(
    conversationId: string | number | null,
    destin: ConversationParticipant,
    message: MessageEntity
  ): ConversationEntity {

    // Buscar la conversación existente
    const existingConversation = this.conversation.find(conv => conv.id === conversationId);


    if (existingConversation) {
      const newConversationMessage = new ConversationEntity({
        ...existingConversation,
        messages: [message],
        participants: [...existingConversation.participants],
        updatedAt: new Date()
      })

      return newConversationMessage;
    }
    else {

      const conversation = new ConversationEntity({
        id: '',
        title: `Conversación con ${destin.userName}`,
        type: ConversationType.INDIVIDUAL,
        participants: [destin,],
        messages: [message],
        createdAt: new Date(),
        isActive: true
      });
      return conversation;
    }
  }

  /**
   * Escucha mensajes en tiempo real y actualiza la conversación local.
   */
  private listenForMessages(): void {
    this.manageRealTimeMessages.listenForMessages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (incomingConversation: ConversationEntity) => {
          const index = this.conversation.findIndex(conv => conv.id === incomingConversation.id);
          if (index !== -1) {
            // Agregar solo los mensajes nuevos 
            incomingConversation.messages.forEach(message => {
              if (!this.conversation[index].messages.some(existingMessage => existingMessage.id === message.id)) {
                this.conversation[index].messages.push(message);
              }
            });
            this.conversation[index].updatedAt = incomingConversation.updatedAt || new Date();
          } else {
            this.conversation.push(incomingConversation);
          }
        },
        error: error => console.error('Error recibiendo conversación:', error)
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

  private loadMessages(): void { }
}
