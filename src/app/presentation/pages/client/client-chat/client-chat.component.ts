import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatSidebarComponent } from '../../../components/chat/chat-sidebar/chat-sidebar.component';
import { ChatMessagesComponent } from '../../../components/chat/chat-messages/chat-messages.component';
import { IMessageRepository } from '../../../../core/interfaces/repositorys/chat/i-message.repository';
import { MessageRepository } from '../../../../data/repositories/message.repository';
import { ContactRepository } from '../../../../data/repositories/user-contact.repository';
import { ContactDataSource } from '../../../../infrastructure/datasources/contact.service';
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
import { MessageDataSource } from '../../../../infrastructure/datasources/message.service';


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
  /** Contacto actualmente seleccionado en la conversación */
  contactSelected!: ConversationParticipant;
  /** Lista de todos los contactos disponibles */
  contacts: ConversationParticipant[] = [];
  /** Almacena todas las conversaciones activas */
  conversations: ConversationEntity[] = [];
  /** Indica si el contacto está escribiendo actualmente */
  isTyping: boolean = false;
  /** Subject para manejar la limpieza de subscripciones */
  private unsubscribe$ = new Subject<void>();

  /**
   * Inicializa los datos de la pantalla y la comunicación en tiempo real.
   * Se llama cuando el componente se inicializa.
   */
  ngOnInit(): void {
    this.initData();
    this.initRealTimeCommunication();
  }

  /**
   * Destruye la suscripción y cierra la conexión con SignalR cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.manageRealTimeMessages.closeConnection();
  }

  /**
   * Cambia el estado de un contacto y actualiza la conversacion activa.
   * @param contact El contacto seleccionado.
   */
  onContactClick(contact: ConversationParticipant): void {
    this.contacts.forEach((c) => (c.selected = false));
    contact.selected = true;
    this.contactSelected = contact;
  }
  /**
   * Notifica al servidor que el usuario esta escribiendo actualmente.
   * @param text El texto ingresado por el usuario.
   */
  onTyping(text: string): void {
    if (this.contactSelected && text?.length > 0) {
      this.manageTypingStatus.notifyTyping(2, true);
    }
  }

  /**
   * Inicializa los datos de la pantalla, obteniendo la lista de contactos y una conversacion de ejemplo.
   * Selecciona el primer contacto activo o el primero de la lista si no hay ninguno activo.
   * Se suscribe a los eventos de ContactUseCase y ConversationUseCase para obtener los datos.
   * Se cancelan las subscripciones cuando el componente se destruye.
   */
  initData() {
    // Obtener contactos
    this.ContactsUseCase.execute()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: contacts => {
          this.contacts = contacts;
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

  /**
   * Incializa la comunicación en tiempo real, 
   * escucha los mensajes y actualiza la conversación local.
   */
  private initRealTimeCommunication(): void {
    this.manageRealTimeMessages.initializeConnection();
    this.listenForMessages();
    this.listenForTypingStatus();
  }

  /** 
   * MENSAJE RELACIONADO MÉTODOS
   */

  /**
  * Se llama cuando se envía un nuevo mensaje de texto.
  * Si no existe una conversación, primero la crea y luego envía el mensaje.
  * @param newMessage El texto del nuevo mensaje.
  */
  onSendMessage(newMessage: string): void {
    const message = this.createMessage(newMessage);
    const existingConversation = this.findConversationByParticipant(this.contactSelected);

    if (existingConversation) {
      message.conversationId = existingConversation.id;
      this.sendExistingConversationMessage(message);
    } else {
      this.createNewConversationAndSendMessage(message);
    }
  }

  /**
   * Envía un mensaje en una conversación existente
   */
  private sendExistingConversationMessage(message: MessageEntity): void {
    this.manageRealTimeMessages.sendMessage(message)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (conversation) => {
          const conv = this.findConversationById(conversation.id);
          if (conv) {
            conv.messages.push(message);
          }
          this.manageRealTimeMessages.broadcastMessage(message);
        },
        error: this.handleMessageError.bind(this)
      });
  }

  /**
   * Crea una nueva conversación y envía el primer mensaje
   */
  private createNewConversationAndSendMessage(message: MessageEntity): void {
    this.manageRealTimeMessages.sendMessage(message)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (conversation) => {
          this.conversations.push(conversation);
          this.manageRealTimeMessages.broadcastMessage(message);
        },
        error: this.handleMessageError.bind(this)
      });
  }

  /**
   * Crea un nuevo objeto MessageEntity con el contenido proporcionado.
   */
  private createMessage(content: string): MessageEntity {
    const sender = this.createParticipant(2, 'Solano flores');
    return new MessageEntity({
      id: 2,
      sender: sender,
      content: content,
      type: MessageType.TEXT,
      status: [new MessageStatus(2, Status.SENT, new Date())],
      createdAt: new Date(),
      isDeleted: false
    });
  }

  /**
   * Crea un nuevo objeto ConversationParticipant con los datos proporcionados.
   * @param userId El id del usuario.
   * @param userName El nombre del usuario.
   * @returns Un objeto ConversationParticipant con los datos proporcionados.
   */
  private createParticipant(userId: number, userName: string): ConversationParticipant {
    return new ConversationParticipant({
      userId: userId,
      userName: userName,
      avatar: `https://example.com/avatar${userId}.jpg`
    });
  }
  /**
   * Maneja el error cuando se produce un error al enviar un mensaje.
   */
  private handleMessageError(error: any): void {
    console.error('Error enviando mensaje:', error);
    this.manageTypingStatus.notifyTyping(2, false);
  }

  /**
   * MENSAJE TIEMPO REAL MÉTODOS
   */

  private listenForMessages(): void {
    this.manageRealTimeMessages.listenForMessages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (incomingMessage: MessageEntity) => {
          this.handleIncomingMessage(incomingMessage);
        },
        error: error => console.error('Error al recibir mensajes:', error)
      });
  }

  private handleIncomingMessage(incomingMessage: MessageEntity): void {
    const conversation = this.findConversationById(incomingMessage.conversationId);
    if (conversation) {
      conversation.messages.push(incomingMessage);
    }
  }

  /**
   * UTILIDADES Y BÚSQUEDA
   */

  private findConversationByParticipant(participant: ConversationParticipant): ConversationEntity | undefined {
    return this.conversations.find(conv =>
      conv.participants.some(p => p.userId === participant.userId)
    );
  }

  private findConversationById(conversationId: string | number | undefined): ConversationEntity | undefined {
    return this.conversations.find(conv =>
      conv?.id?.toString() === conversationId?.toString()
    );
  }

  /**
   * Escucha el estado de escritura en tiempo real y actualiza el estado de escritura
   * de cada usuario en la lista de conversaciones.
   */
  private listenForTypingStatus(): void {
    this.manageTypingStatus.listenTypingStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ({ userId, isTyping }) => {
          this.updateTypingStatus(userId, isTyping);
        },
        error: (error) => console.error('Error al recibir el estado de escritura:', error),
      });
  }
  /**
   * Actualiza el estado de escritura de un usuario en la lista de conversaciones.
   * 
   * @param userId El ID del usuario a actualizar.
   * @param isTyping El estado de escritura a asignar.
   */
  private updateTypingStatus(userId: number | string, isTyping: boolean): void {
    const contact = this.findContactById(userId);
    if (contact) {
      this.isTyping = isTyping;
    }
  }
  /**
   * Busca un contacto en la lista de contactos por su ID.
   * 
   * @param userId El ID del contacto a buscar.
   * @returns El contacto con el ID proporcionado, o undefined si no se encuentra.
   */
  private findContactById(userId: number | string): ConversationParticipant | undefined {
    return this.contacts.find(contact =>
      contact.userId?.toString().trim() === userId?.toString().trim()
    );
  }

  /**
   * Obtiene los mensajes asociados al contacto seleccionado. 
   * @returns El array de mensajes asociados al contacto seleccionado.
   */
  getMessages(): MessageEntity[] {
    const conversation = this.conversations.find(
      conv => conv.id?.toString().trim() === this.contactSelected?.conversationId?.toString().trim()
    );
    return conversation?.messages || [];
  }

}
