import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatSidebarComponent } from '../../../components/chat/chat-sidebar/chat-sidebar.component';
import { ChatMessagesComponent } from '../../../components/chat/chat-messages/chat-messages.component';
import { IMessageRepository } from '../../../../core/interfaces/repositorys/chat/i-message.repository';
import { MessageRepository } from '../../../../data/repositories/message.repository';
import { ContactRepository } from '../../../../data/repositories/userContact.repository';
import { ContactDataSource } from '../../../../infrastructure/datasources/api-contact.datasource';
import { MessageDataSource } from '../../../../infrastructure/datasources/message.sevice';
import { IMessageDatasource } from '../../../../core/interfaces/datasource/auth/i-message-datasource';
import { SignalRService } from '../../../../core/services/signal-r.service';
import { IRealTimeComunication } from '../../../../core/interfaces/signalR/i-real-time-comunication';
import { ManageRealtimeMessageUseCase } from '../../../../core/use-cases/signalR/manage-realtime-message-use-case';
import { ManageTypingStatusUseCase } from '../../../../core/use-cases/signalR/manage-typing-status-use-case';
import { UserEntity } from '../../../../core/domain/model/chat/user-entity';
import { IUserRepository } from '../../../../core/interfaces/repositorys/chat/i-user-repository';
import { IUserDatasource } from '../../../../core/interfaces/datasource/chat/I-user-datasource';
import { MessageEntity, MessageType } from '../../../../core/domain/model/chat/message-entity';
import {
  ConversationEntity,
  ConversationType,
} from '../../../../core/domain/model/chat/conversation-entity';
import { ConversationParticipant } from '../../../../core/domain/model/chat/conversation-participant';
import { MessageStatus, Status } from '../../../../core/domain/model/chat/message-status';
import { Subject, takeUntil } from 'rxjs';
import { ContactsUseCase } from '../../../../core/use-cases/chat/contacts-use-case';
import { ChatHeaderComponent } from "../../../components/chat/chat-header/chat-header.component";
import { ChatInputComponent } from "../../../components/chat/chat-input/chat-input.component";


@Component({
  selector: 'app-client-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChatSidebarComponent,
    ChatMessagesComponent,
    ChatHeaderComponent,
    ChatInputComponent
  ],
  providers: [
    ContactsUseCase,
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
    private ContactsUseCase: ContactsUseCase,
    private manageRealTimeMessages: ManageRealtimeMessageUseCase,
    private manageTypingStatus: ManageTypingStatusUseCase,
  ) { }

  contactSelected!: ConversationParticipant;
  contacts: ConversationParticipant[] = [];
  conversation: ConversationEntity[] = [];
  isTyping: boolean = false;
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

  onContactClick(contact: ConversationParticipant): void {
    this.contacts.forEach((c) => (c.selected = false));
    contact.selected = true;
    this.contactSelected = contact;
  }

  initData() {
    // Obtener contactos
    this.ContactsUseCase.execute()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: contacts => {
          this.contacts = contacts;
          console.log('Contactos obtenidos:', contacts);
          // Seleccionar un contacto primero
          this.contactSelected = contacts.find(c => c.isActive) || contacts[0];
        },
        error: err => console.error('Error obteniendo contactos:', err)
      });
  }

  private initRealTimeCommunication(): void {
    this.manageRealTimeMessages.initializeConnection();
    this.listenForMessages();
    this.listenForTypingStatus();
  }
  onTyping(text: string): void {
    if (this.contactSelected) {
      this.manageTypingStatus.notifyTyping(2, true);
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


    // Enviar mensaje en tiempo real
    this.manageRealTimeMessages.sendMessage(message)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (conversation: ConversationEntity) => {
          // verificamos que la conversacion no exista antes de añadir
          const existingConversation = this.conversation.find(conv => conv.id === conversation.id);
          if (!existingConversation) {
            this.conversation.push(conversation);
          }
          // Notificar que el usuario dejó de escribir
          this.manageTypingStatus.notifyTyping(2, false);
        },
        error: error => {
          console.error('Error enviando mensaje:', error);
          this.manageTypingStatus.notifyTyping(2, false);
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
        next: (incomingMessage: MessageEntity) => {
          const index = this.conversation.findIndex(conv => conv.id === incomingMessage.conversationId);
          if (index !== -1) {
            this.conversation[index].messages.push(incomingMessage);
          }
        },
        error: error => console.error('Error al recibir mensajes:', error)
      });
  }


  private listenForTypingStatus(): void {
    this.manageTypingStatus.listenTypingStatus().subscribe({
      next: ({ userId, isTyping }) => {
        const contact = this.contacts.find((c) => userId.includes(c.userId?.toString()));
        if (contact) {

        }
        this.isTyping = isTyping;
      },
      error: (error) => console.error('Error al recibir el estado de escritura:', error),
    });
  }

}
