import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatSidebarComponent } from '../../../components/chat/chat-sidebar/chat-sidebar.component';
import { ChatMessagesComponent } from '../../../components/chat/chat-messages/chat-messages.component';
import { IMessageRepository } from '../../../../core/interfaces/repositorys/chat/i-message.repository';
import { MessageRepository } from '../../../../data/repositories/message.repository';
import { ContactRepository } from '../../../../data/repositories/user-contact.repository';
import { ContactDataSource } from '../../../../infrastructure/datasources/contact-datasource';
import { MessageDataSource } from '../../../../infrastructure/datasources/message-datasource';
import { IMessageDatasource } from '../../../../core/interfaces/datasource/auth/i-message-datasource';
import { SignalRService } from '../../../../core/services/signal-r.service';
import { IRealTimeComunication } from '../../../../core/interfaces/signalR/i-real-time-comunication';
import { ManageRealtimeMessageUseCase } from '../../../../core/use-cases/signalR/manage-realtime-message-use-case';
import { ManageTypingStatusUseCase } from '../../../../core/use-cases/signalR/manage-typing-status-use-case';
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
import { ConversationUseCase } from '../../../../core/use-cases/chat/conversation-use-case';
import { IConversationRepository } from '../../../../core/interfaces/repositorys/chat/i-conversation-repository';
import { ConversationService } from '../../../../infrastructure/datasources/conversation.service';
import { ConversationRepository } from '../../../../data/repositories/conversation.repository';
import { IConversationDatasource } from '../../../../core/interfaces/datasource/chat/i-conversation-datasource';
import { StorageService } from '../../../../core/services/storage.service';


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
    ContactsUseCase,
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
    ConversationUseCase,
    {
      provide: IConversationRepository,
      useClass: ConversationRepository,
    },
    {
      provide: IConversationDatasource,
      useClass: ConversationService,
    }
  ],
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css'],
})
export class ClientChatComponent implements OnInit, OnDestroy {
  constructor(
    private ContactsUseCase: ContactsUseCase,
    private manageRealTimeMessages: ManageRealtimeMessageUseCase,
    private manageTypingStatus: ManageTypingStatusUseCase,
    private conversationUseCase: ConversationUseCase,
    private storage: StorageService
  ) { }

  contactSelected!: ConversationParticipant;
  contacts: ConversationParticipant[] = [];
  conversations: ConversationEntity[] = [];
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
  onTyping(text: string): void {
    if (this.contactSelected && text?.length > 0) {
      this.manageTypingStatus.notifyTyping(2, true);
    }
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

    // Obtener una conversacion
    this.conversationUseCase.getConversationByParticipants(2, 1)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (conversation) => {
          this.conversations.push(conversation);
          console.log('Conversaciones obtenidas:', conversation);
        },
        error: err => console.error('Error obteniendo conversaciones:', err)
      });
  }

  private initRealTimeCommunication(): void {
    this.manageRealTimeMessages.initializeConnection();
    this.listenForMessages();
    this.listenForTypingStatus();
  }


  onSendMessage(newMessage: string): void {
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


    this.manageRealTimeMessages.sendMessage(message)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (incomingConversation) => {
          const exist = this.conversations.find(conv => {
            conv?.id?.toString() === incomingConversation?.id?.toString();
          });
          if (!exist) {
            this.conversations.push(incomingConversation);
          }
        },
        error: error => {
          console.error('Error enviando mensaje:', error);
          this.manageTypingStatus.notifyTyping(2, false);
        }
      });
  }


  /**
   * Escucha mensajes en tiempo real y actualiza la conversación local.
   */
  private listenForMessages(): void {
    this.manageRealTimeMessages.listenForMessages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (incomingMessage: MessageEntity) => {
          console.log("mensaje Recibido", incomingMessage)

          const index = this.conversations.findIndex(conv => {
            conv?.id?.toString() === incomingMessage?.conversationId?.toString()
          });
          if (index !== -1) {
            this.conversations[index].messages.push(incomingMessage);
          }
        },
        error: error => console.error('Error al recibir mensajes:', error)
      });
  }


  private listenForTypingStatus(): void {
    this.manageTypingStatus.listenTypingStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ userId, isTyping }) => {
          const contact = this.contacts.find((c) => {
            if (!c.userId || !userId) return false;
            return c.userId?.toString().trim() === userId?.toString().trim();
          });
          // 
          if (contact) { }
          // Actualizar el estado de escritura
          this.isTyping = isTyping;
        },
        error: (error) => console.error('Error al recibir el estado de escritura:', error),
      });
  }

  // obtener los mensajes de una conversación
  getMessages(): MessageEntity[] {
    const conversation = this.conversations.find(
      conv => conv.id?.toString().trim() === this.contactSelected?.conversationId?.toString().trim()
    );
    return conversation?.messages || [];
  }

}
