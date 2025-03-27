import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ApiConfig } from '../../../infrastructure/config/app.config';
import { StorageService } from '../storage/storage.service';
import { Observable, Subject } from 'rxjs';
import { IRealTimeComunication } from '../../interfaces/signalR/i-real-time-comunication';
import { MessageEntity } from '../../domain/entities/chat/message-entity';
import { ConversationParticipant } from '../../domain/entities/chat/conversation-participant';
@Injectable({
  providedIn: 'root',
})
export class SignalRService implements IRealTimeComunication {
  private hubConnection!: signalR.HubConnection;
  private messageReceived = new Subject<MessageEntity>();
  private typingStatus = new Subject<{ userId: string; isTyping: boolean }>();

  constructor(
    private apiUrl: ApiConfig,
    private storageService: StorageService,
  ) { }

  async connect() {
    try {

      // si ya existe una conexión activa, no se intenta crear una nueva
      if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
        console.log('Ya existe una conexión SignalR activa');
        return;
      }

      // crea una nueva conexión con el hub de SignalR
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.apiUrl.getEndpoint('signalR', 'chatHub'), {
          accessTokenFactory: () => this.storageService.getToken(),
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000])
        .configureLogging(signalR.LogLevel.Debug)
        .build();

      // eventos de reconexión
      this.setupConnectionEvents();

      //  iniciar la conexión
      await this.hubConnection.start().then(() => {
        console.log('Conexión SignalR iniciada');
      });

      // listener de mensajes
      this.setupMessageListener();
    } catch (err) {
      console.error('Error al iniciar la conexión:');
    }
  }

  setupConnectionEvents(): void {
    this.hubConnection.onreconnecting((error) => {
      console.log('Intentando reconectar...', error);
    });

    this.hubConnection.onreconnected((connectionId) => {
      console.log('Reconectado exitosamente. ID:', connectionId);
    });

    this.hubConnection.onclose((error) => {
      console.log('Conexión cerrada:', error);
    });
  }

  disconnect() {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => console.log('Coneccion detenida'))
        .catch((err) => console.log('Error al detener la coneccion: ' + err));
    }
  }

  onMessage(): Observable<MessageEntity> {
    return this.messageReceived.asObservable();
  }

  /**
   * Envia un mensaje a un usuario a traves del hub de SignalR. Si no se ha
   * establecido una coneccion con el hub, el mensaje no se envia.
   * @param message El texto del mensaje que se va a enviar.
   */
  sendMessage(message: MessageEntity) {
    if (this.hubConnection) {
      this.hubConnection
        .invoke('SendMessage', message)
        .then(() => console.log('Mensaje enviado'))
        .catch((err) => console.log('Error al enviar el mensaje: ' + err));
    }
  }
  // listener para el estado de typing
  onTypingStatus(): Observable<{ userId: string; isTyping: boolean }> {
    return this.typingStatus.asObservable();
  }

  // envia un estado de typing
  setTypingStatus(userId: string, isTyping: boolean): void {
    if (this.hubConnection) {
      this.hubConnection
        .invoke('UserTyping', userId, isTyping)
        .then(() => console.log('Estado de typing actualizado'))
        .catch((err) => console.log('Error al actualizar el estado de typing: ' + err));
    }
  }

  /**
   * Establece un listener para recibir mensajes de SignalR. Cuando se recibe
   * un mensaje, se notifica a los subscriptores de `messageReceived` con un
   * objeto `Message` que contiene el texto del mensaje
   */
  private setupMessageListener(): void {
    // listener de mensajes
    this.hubConnection.on('ReceiveMessage', (message: MessageEntity) => {
      this.messageReceived.next(message);
    });

    // listener de estado de typing
    this.hubConnection.on('UserTypingStatus', (userId: string, isTyping: boolean) => {
      this.typingStatus.next({ userId, isTyping });
    });
  }
}
