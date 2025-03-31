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
import { MessageEntity, MessageType } from '../../../../core/domain/entities/chat/message-entity';
import {
  ConversationEntity,
  ConversationType,
} from '../../../../core/domain/entities/chat/conversation-entity';
import { ConversationParticipant } from '../../../../core/domain/entities/chat/conversation-participant';
import { MessageStatus, Status } from '../../../../core/domain/entities/chat/message-status';
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
import { TypingStatus } from '../../../../core/domain/entities/signalR/TypingStatus';
import { PrivateMessage } from '../../../../core/domain/entities/signalR/PrivateMessage';
import { ManageOnlineUserUseCase } from '../../../../core/use-cases/signalR/manage-online-user-use-case';
import { OnlineUser } from '../../../../core/domain/entities/signalR/OnlineUser';

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
    ManageOnlineUserUseCase,
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
  isMobile: boolean = window.innerWidth <= 768; // Inicializa la vista móvil
  isLoadingContacts: boolean = true; // Indica si los contactos están siendo cargados

  constructor(
    private ContactsUseCase: ContactsUseCase,
    private manageRealTimeMessages: ManageRealtimeMessageUseCase,
    private manageTypingStatus: ManageTypingStatusUseCase,
    private manageOnlineUsers: ManageOnlineUserUseCase,
    private conversationUseCase: ConversationUseCase,
    private storage: StorageService
  ) {
    // Detectar cambios en el tamaño de la ventana para ajustar la vista
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.isChatView = false;
      }
    });
  }
  /** Contacto actualmente seleccionado en la conversación */
  contactSelected!: ConversationParticipant;
  /** Lista de todos los contactos disponibles */
  contacts: ConversationParticipant[] = [];
  /** Almacena todas las conversaciones activas */
  conversations: ConversationEntity[] = [];
  /** Indica si el contacto está escribiendo actualmente */
  typingStatus!: TypingStatus;
  /** Indica si los mensajes están siendo cargados */
  isLoadingMessages: boolean = false;
  /** Indica si se muestra la vista de chat en móvil */
  isChatView: boolean = false;
  /** Subject para manejar la limpieza de subscripciones */
  private unsubscribe$ = new Subject<void>();

  /**
   * Inicializa los datos de la pantalla y la comunicación en tiempo real.
   * Se llama cuando el componente se inicializa.
   */
  async ngOnInit(): Promise<void> {
    try {
      await this.initRealTimeCommunication();
      this.initData();
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
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
   * y obtiene la conversación asociada al contacto seleccionado.
   * @param contact El contacto seleccionado.
   */
  onContactClick(contact: ConversationParticipant): void {
    this.contacts.forEach((c) => (c.selected = false));
    contact.selected = true;
    this.contactSelected = contact;
    this.conversations = [];
    this.isLoadingMessages = true;
    this.conversationUseCase.getConversationById(this.contactSelected.conversationId as number)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (conversation) => {
          this.conversations.push(conversation);
          this.isLoadingMessages = false;
        },
        error: err => {
          console.error('Error obteniendo conversación:', err);
          this.isLoadingMessages = false;
        }
      });

    if (this.isMobile) {
      this.isChatView = true;
    }
  }

  /**
   * Notifica al servidor que el usuario esta escribiendo actualmente.
   * @param text El texto ingresado por el usuario.
   */
  onTyping(text: string): void {
    if (this.contactSelected && text?.length > 0) {
      this.manageTypingStatus.notifyTyping({
        senderId: this.currenUserSesion().userId, // ID del usuario actual
        receiverId: this.contactSelected.userId, // ID del contacto seleccionado
        isTyping: true, // Indica que el usuario está escribiendo
        conversationId: this.contactSelected.conversationId, // ID de la conversación actual
        username: this.currenUserSesion().userName // Nombre del usuario actual
      });
    }
  }

  /**
   * Inicializa los datos de la pantalla.
   * Obtiene la lista de contactos y establece el contacto activo.
   */
  private initData() {
    this.isLoadingContacts = true;
    this.ContactsUseCase.execute()
      .pipe(takeUntil(this.unsubscribe$),)
      .subscribe({
        next: contacts => {
          this.contacts = contacts;
          this.isLoadingContacts = false;
          // Solicitar el estado de usuarios en línea después de cargar los contactos
          this.manageOnlineUsers.getOnlineUsers();
        },
        error: err => {
          console.error('Error obteniendo contactos:', err);
          this.isLoadingContacts = false;
        }
      });
  }

  /**
   * Incializa la comunicación en tiempo real, 
   * escucha los mensajes y actualiza la conversación local.
   */
  private async initRealTimeCommunication(): Promise<void> {
    try {
      await this.manageRealTimeMessages.initializeConnection();
      this.listenForMessages();
      this.listenForTypingStatus();
      this.listenForOnlineUsers();
      this.listenForUserConnected();
      this.listenForUserDisconnected();
    } catch (error) {
      console.error('Error en la comunicación en tiempo real:', error);
      throw error;
    }
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

    // Verificar si no existe una conversación
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

    // Agregar mensaje localmente primero (optimistic update)
    const conversation = this.findConversationById(message.conversationId);
    if (conversation) {
      message.status = [new MessageStatus(this.currenUserSesion().userId, Status.PENDING, new Date())];
      conversation.messages.push(message);
    }

    // Enviar mensaje al servidor
    this.manageRealTimeMessages.sendMessage(message)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (incomingMessage) => {
          if (incomingMessage && conversation) {
            // Actualizar el mensaje local con la información del servidor
            const index = conversation.messages.findIndex(m =>
              m.content === message.content &&
              m.sender.userId === message.sender.userId
            );
            if (index !== -1) {
              conversation.messages[index] = incomingMessage;
            }
          }
        },
        error: (error) => {
          // En caso de error, marcar el mensaje como fallido
          if (conversation) {
            const index = conversation.messages.findIndex(m => m === message);
            if (index !== -1) {
              conversation.messages[index].status = [
                new MessageStatus(this.currenUserSesion().userId, Status.FAILED, new Date())
              ];
            }
          }
          this.handleMessageError(error);
        },
        complete: () => {
          this.handleCompleteSendMessage(message);
        }
      });
  }

  private currenUserSesion(): ConversationParticipant {
    const userId = this.storage.getItem('userId');
    const userName = this.storage.getItem('email');
    return new ConversationParticipant({
      userId: userId || '',
      userName: userName || '',
    });
  }

  /**
   * Maneja la finalización del envío de un mensaje.
   * Notifica que el usuario ha dejado de escribir y transmite el mensaje enviado en tiempo real.
   * @param message El mensaje enviado.
   */
  private handleCompleteSendMessage(message: MessageEntity): void {
    // Notificar que el usuario ha dejado de escribir
    this.manageTypingStatus.notifyTyping({
      senderId: this.currenUserSesion().userId,
      receiverId: this.contactSelected.userId,
      isTyping: false,
      conversationId: this.contactSelected.conversationId
    });
    //  Transmitir el mensaje enviado en tiempo real
    this.manageRealTimeMessages.broadcastMessage({
      ...message,
      recipientId: this.contactSelected.userId,
    });
  }


  /**
   * Maneja el error cuando se produce un error al enviar un mensaje.
   * Limpia el estado de escritura y muestra el error en la consola.
   * @param error El error producido al enviar el mensaje.
   */
  private handleMessageError(error: any): void {
    console.error('Error enviando mensaje:', error);
    this.manageTypingStatus.notifyTyping({
      senderId: this.currenUserSesion().userId,
      receiverId: this.contactSelected.userId,
      isTyping: false,
      conversationId: this.contactSelected.conversationId
    });
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
      status: [new MessageStatus(sender.userId, Status.SENT, new Date())],
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
        next: (incomingMessage: PrivateMessage) => {
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
    if (!incomingMessage.conversationId) {
      console.error('Mensaje recibido sin ID de conversación');
      return;
    }

    const conversation = this.findConversationById(incomingMessage.conversationId);
    const isCurrentUserMessage = incomingMessage.sender.userId === this.currenUserSesion().userId;

    // Si es un mensaje del usuario actual y ya existe en la conversación, no lo agregamos
    if (isCurrentUserMessage && conversation) {
      const messageExists = conversation.messages.some(m =>
        m.content === incomingMessage.content &&
        m.sender.userId === incomingMessage.sender.userId &&
        Math.abs(new Date(m.createdAt).getTime() - new Date(incomingMessage.createdAt).getTime()) < 1000
      );

      if (messageExists) {
        return; // Evitamos agregar el mensaje duplicado
      }
    }

    if (!conversation) {
      // Si no existe la conversación, obtenerla del servidor
      this.conversationUseCase.getConversationById(incomingMessage.conversationId as string | number)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (newConversation) => {
            if (newConversation) {
              this.conversations.push(newConversation);
              if (!isCurrentUserMessage) { // Solo agregamos si no es un mensaje propio
                newConversation.messages.push(incomingMessage);
              }
            }
          },
          error: (error) => console.error('Error al obtener conversación:', error)
        });
    } else {
      if (!isCurrentUserMessage) { // Solo agregamos si no es un mensaje propio
        conversation.messages.push(incomingMessage);
      }
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
        next: (typingStatus) => {
          this.updateTypingStatus(typingStatus);
        },
        error: (error) => console.error('Error al recibir el estado de escritura:', error),
      });
  }

  /**
   * Escucha los cambios en el estado en línea de los usuarios
   */
  private listenForOnlineUsers(): void {
    this.manageOnlineUsers.listenForOnlineUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (onlineUsers) => {
          this.updateOnlineUsersStatus(...onlineUsers);
        },
        error: (error) => console.error('Error al recibir usuarios en línea:', error)
      });
  }

  /**
   * Escucha cuando un usuario se conecta
   */
  private listenForUserConnected(): void {
    this.manageOnlineUsers.listenForUserConnected()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (user) => {
          this.updateOnlineUsersStatus(user);
        },
        error: (error) => console.error('Error al recibir usuario conectado:', error)
      });
  }

  /**
   * Escucha cuando un usuario se desconecta
   */
  private listenForUserDisconnected(): void {
    this.manageOnlineUsers.listenForUserDisconnected()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (user) => {
          this.updateOnlineUsersStatus(user);
        },
        error: (error) => console.error('Error al recibir usuario desconectado:', error)
      });
  }

  /**
   * Actualiza el estado en línea de los contactos en función de la lista de usuarios en línea.
   * 
   * @param onlineUsers Lista de usuarios en línea.
   * @returns void
   */
  private updateOnlineUsersStatus(...onlineUsers: OnlineUser[]): void {
    if (onlineUsers && onlineUsers.length > 0) {
      this.contacts.forEach(contact => {
        // Buscar si el contacto está en la lista de usuarios en línea
        const onlineUser = onlineUsers.find(user => user.userId === contact.userId);
        contact.isOnline = !!onlineUser?.isOnline;
      });
    }

  }

  /**
   * Actualiza el estado de escritura de un usuario en la lista de conversaciones.
   * 
   * @param userId El ID del usuario a actualizar.
   * @param typingStatus El estado de escritura a asignar.
   */
  private updateTypingStatus(typingStatus: TypingStatus): void {
    const contact = this.findContactById(typingStatus.senderId);
    if (contact) {
      this.typingStatus = typingStatus;
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
    if (!this.contactSelected?.conversationId) {
      return [];
    }

    const conversation = this.conversations.find(
      conv => conv?.id === this.contactSelected?.conversationId
    );

    return conversation?.messages || [];
  }

  /**
   * Alterna entre la vista de chat y la vista de contactos.
   */
  toggleView(): void {
    this.isChatView = !this.isChatView;
  }
}
