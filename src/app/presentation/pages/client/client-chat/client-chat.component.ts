import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatSidebarComponent } from '../../../components/chat/chat-sidebar/chat-sidebar.component';
import { ChatMessagesComponent } from '../../../components/chat/chat-messages/chat-messages.component';
import { IMessageRepository } from '../../../../core/interfaces/repositorys/chat/i-message.repository';
import { MessageRepository } from '../../../../data/repositories/chat/message.repository';
import { ContactRepository } from '../../../../data/repositories/chat/user-contact.repository';
import { ContactDataSource } from '../../../../infrastructure/datasources/chat/contact.service';
import { IMessageDatasource } from '../../../../core/interfaces/datasource/auth/i-message-datasource';
import { SignalRService } from '../../../../core/services/signalr/signal-r.service';
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
import { ConversationService } from '../../../../infrastructure/datasources/chat/conversation.service';
import { ConversationRepository } from '../../../../data/repositories/chat/conversation.repository';
import { IConversationDatasource } from '../../../../core/interfaces/datasource/chat/i-conversation-datasource';
import { StorageService } from '../../../../core/services/storage/storage.service';
import { MessageDataSource } from '../../../../infrastructure/datasources/chat/message.service';


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
    this.conversations = [];

    this.conversationUseCase.getConversationById(this.contactSelected.conversationId as number)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (conversation) => {
          this.conversations.push(conversation);
          console.log('Conversación cargada:', conversation);
        },
        error: err => console.error('Error obteniendo conversación:', err)
      });
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
      .pipe(takeUntil(this.unsubscribe$),)
      .subscribe({
        next: contacts => {
          this.contacts = contacts;
          this.contactSelected = contacts.find(c => c.isActive) || contacts[0];
        },
        error: err => console.error('Error obteniendo contactos:', err)
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
   * Envia un mensaje a través de SignalR y actualiza la conversación local.
   * Si no existe una conversación, crea una nueva y envía el mensaje.
   * @param newMessage El contenido del mensaje a enviar.
   */
  onSendMessage(newMessage: string): void {
    const selectedContact = this.contactSelected;

    // Verificar si hay un contacto seleccionado
    if (!selectedContact) {
      console.error('No hay contacto seleccionado');
      return;
    }

    // Verificar si existe una conversación
    if (!selectedContact.conversationId) {
      // Crear nueva conversación
      const newConversation = new ConversationEntity({
        type: ConversationType.INDIVIDUAL,
        participants: [this.currenUserSesion(), selectedContact],
        messages: []
      });

      this.conversationUseCase.createConversation(newConversation)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (conversation) => {
            if (conversation && conversation.id) {
              // Actualizar ID de conversación
              selectedContact.conversationId = conversation.id;
              this.conversations.push(conversation);

              // Crear y enviar mensaje
              const message = this.createMessage(newMessage);
              message.conversationId = conversation.id;
              this.sendMessage(message);
            }
          },
          error: this.handleMessageError.bind(this)
        });
    } else {
      // Ya existe conversación, enviar mensaje directamente
      const message = this.createMessage(newMessage);
      message.conversationId = selectedContact.conversationId;
      this.sendMessage(message);
    }
  }

  /**
   * Envía un mensaje a través de SignalR y actualiza la conversación local.
   * @param message El mensaje a enviar.
   */
  private sendMessage(message: MessageEntity): void {
    if (!message.conversationId) {
      console.error('El mensaje debe tener un ID de conversación');
      return;
    }

    this.manageRealTimeMessages.sendMessage(message)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (conversation) => {
          if (conversation) {
            this.handleNewConversation(conversation);
          }
        },
        complete: () => {
          this.handleCompleteSendMessage(message);
        },
        error: this.handleMessageError.bind(this)
      });
  }
  private currenUserSesion(): ConversationParticipant {
    return new ConversationParticipant({
      userId: 2,
      userName: 'Solano Flores',
      avatar: 'https://example.com/avatar2.jpg'
    });
  }

  /**
   * Se llama cuando se completa el envio del mensaje.
   * Notifica el estado de escritura y transmite el mensaje enviado.
   * @param message El mensaje enviado.
   */
  private handleCompleteSendMessage(message: MessageEntity): void {
    this.manageTypingStatus.notifyTyping(2, false);
    this.manageRealTimeMessages.broadcastMessage(message);
  }

  /**
   * Se llama cuando se recibe una conversación nueva desde el SignalR.
   * Verifica si la conversación ya existe en la lista de conversaciones locales.
   * Si no existe, se agrega a la lista de conversaciones. De lo contrario, no se hace nada.
   * @param incomingConversation La conversación recibida desde el SignalR.
   */
  private handleNewConversation(incomingConversation: ConversationEntity): void {
    const conversationExists = this.conversations.some(conv =>
      conv?.id?.toString() === incomingConversation?.id?.toString()
    );
    if (!conversationExists) {
      this.conversations.push(incomingConversation);
    }
  }

  /**
   * Maneja el error cuando se produce un error al enviar un mensaje.
   * Limpia el estado de escritura y muestra el error en la consola.
   * @param error El error producido al enviar el mensaje.
   */
  private handleMessageError(error: any): void {
    console.error('Error enviando mensaje:', error);
    this.manageTypingStatus.notifyTyping(2, false);
  }

  /**
   * Crea un nuevo objeto MessageEntity con el contenido proporcionado.
   * Asigna un remitente utilizando el método createParticipant.
   * El tipo de mensaje es TEXT y se inicializa con un estado de enviado.
   * 
   * @param content El contenido del mensaje a enviar.
   * @returns Un objeto MessageEntity representando el mensaje creado.
   */
  private createMessage(content: string): MessageEntity {
    const sender = this.currenUserSesion();

    return new MessageEntity({
      sender: sender,
      content: content,
      type: MessageType.TEXT,
      status: [new MessageStatus(2, Status.SENT, new Date())],
      createdAt: new Date(),
      isDeleted: false
    });
  }


  /**
   * Escucha los mensajes en tiempo real y actualiza la conversación local.
   * Se cancela la subscripción cuando el componente se destruye.
   */
  private listenForMessages(): void {
    this.manageRealTimeMessages.listenForMessages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (incomingMessage: MessageEntity) => {
          console.log('Mensaje recibido:', incomingMessage);
          this.handleIncomingMessage(incomingMessage);
        },
        error: error => console.error('Error al recibir mensajes:', error)
      });
  }
  /**
 * Procesa un mensaje entrante y lo agrega a la conversacion correspondiente.
 *
 * @param incomingMessage El mensaje entrante que se va a procesar.
 */
  private handleIncomingMessage(incomingMessage: MessageEntity): void {
    // Verificar que el mensaje tenga ID de conversación
    if (!incomingMessage.conversationId) {
      console.error('Mensaje recibido sin ID de conversación');

    }

    const conversation = this.findConversationById(incomingMessage.conversationId);

    if (!conversation) {
      // Si no existe la conversación, obtenerla del servidor
      this.conversationUseCase.getConversationById(incomingMessage.conversationId as string | number)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (newConversation) => {
            if (newConversation) {
              this.conversations.push(newConversation);
              newConversation.messages.push(incomingMessage);
            }
          },
          error: (error) => console.error('Error al obtener conversación:', error)
        });
    } else {
      conversation.messages.push(incomingMessage);
    }
  }
  /**
   * Encuentra una conversaci n por su ID.
   * 
   * @param conversationId El ID de la conversaci n a buscar.
   * @returns La conversaci n con el ID proporcionado, o undefined si no se encuentra.
   */
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
      conv => conv.id === this.contactSelected?.conversationId
    );
    return conversation?.messages || [];
  }

}
