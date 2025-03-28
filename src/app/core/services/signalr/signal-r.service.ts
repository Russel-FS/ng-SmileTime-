import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ApiConfig } from '../../../infrastructure/config/app.config';
import { StorageService } from '../storage/storage.service';
import { Observable, Subject } from 'rxjs';
import { IRealTimeComunication } from '../../interfaces/signalR/i-real-time-comunication';
import { TypingStatus } from '../../domain/entities/signalR/TypingStatus';
import { PrivateMessage } from '../../domain/entities/signalR/PrivateMessage';
import { OnlineUser } from '../../domain/entities/signalR/OnlineUser';

@Injectable({
  providedIn: 'root',
})
export class SignalRService implements IRealTimeComunication {
  private hubConnection!: signalR.HubConnection;
  private messageReceived = new Subject<PrivateMessage>();
  private typingStatus = new Subject<TypingStatus>();
  private onlineUsers = new Subject<OnlineUser[]>();
  private userConnected = new Subject<OnlineUser>();
  private userDisconnected = new Subject<OnlineUser>();

  constructor(
    private apiUrl: ApiConfig,
    private storageService: StorageService,
  ) { }

  async connect(): Promise<void> {
    try {
      if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
        console.log('Ya existe una conexión SignalR activa');
        return;
      }

      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(this.apiUrl.getEndpoint('signalR', 'chatHub'), {
          accessTokenFactory: () => this.storageService.getToken(),
          transport: signalR.HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000])
        .configureLogging(signalR.LogLevel.Debug)
        .build();

      this.setupConnectionEvents();
      this.setupMessageListener();

      await this.hubConnection.start();
      console.log('Conexión SignalR iniciada');
    } catch (err) {
      console.error('Error al iniciar la conexión:', err);
      throw err;
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

  onMessage(): Observable<PrivateMessage> {
    return this.messageReceived.asObservable();
  }

  /**
   * Envia un mensaje a un usuario a traves del hub de SignalR. Si no se ha
   * establecido una coneccion con el hub, el mensaje no se envia.
   * @param message El texto del mensaje que se va a enviar.
   */
  sendMessage(message: PrivateMessage): void {
    if (this.hubConnection) {
      this.hubConnection
        .invoke('SendPrivateMessage', message)
        .then(() => console.log('Mensaje enviado' + JSON.stringify(message, null, 2)))
        .catch((err) => console.log('Error al enviar el mensaje: ' + err));
    }
  }

  // listener para el estado de typing
  onTypingStatus(): Observable<TypingStatus> {
    return this.typingStatus.asObservable();
  }

  // envia un estado de typing
  setTypingStatus(typingStatus: TypingStatus): void {
    if (this.hubConnection) {
      this.hubConnection
        .invoke('UserTyping', typingStatus)
        .then(() => console.log('Estado de typing actualizado'))
        .catch((err) => console.log('Error al actualizar el estado de typing: ' + err));
    }
  }

  // Obtener usuarios en línea
  getOnlineUsers(): void {
    if (this.hubConnection) {
      this.hubConnection
        .invoke('GetOnlineUsers')
        .then(() => console.log('Solicitud de usuarios en línea enviada'))
        .catch((err) => console.log('Error al solicitar usuarios en línea: ' + err));
    }
  }

  // Observable para los usuarios en línea
  onOnlineUsers(): Observable<OnlineUser[]> {
    return this.onlineUsers.asObservable();
  }

  onUserConnected(): Observable<OnlineUser> {
    return this.userConnected.asObservable();
  }

  onUserDisconnected(): Observable<OnlineUser> {
    return this.userDisconnected.asObservable();
  }

  /**
   * Establece un listener para recibir mensajes de SignalR. Cuando se recibe
   * un mensaje, se notifica a los subscriptores de `messageReceived` con un
   * objeto `Message` que contiene el texto del mensaje
   */
  private setupMessageListener(): void {
    // listener de mensajes
    this.hubConnection.on('ReceivePrivateMessage', (message: PrivateMessage) => {
      console.log('Mensaje recibido:', JSON.stringify(message, null, 2));
      this.messageReceived.next(message);
    });

    // listener de estado de typing
    this.hubConnection.on('UserTypingStatus', (typingStatus: TypingStatus) => {
      this.typingStatus.next(typingStatus);
    });

    // listener de usuarios en línea
    this.hubConnection.on('OnlineUsers', (users: OnlineUser[]) => {
      this.onlineUsers.next(users);
    });

    // listener de conexión de usuario
    this.hubConnection.on('UserConnected', (user: OnlineUser) => {
      console.log('Usuario conectado:', user);
      this.userConnected.next(user);
    });

    // listener de desconexión de usuario
    this.hubConnection.on('UserDisconnected', (user: OnlineUser) => {
      console.log('Usuario desconectado:', user);
      this.userDisconnected.next(user);
    });
  }
}
