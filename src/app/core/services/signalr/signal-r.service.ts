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
      console.log('Usuarios en línea recibidos:', users);
      this.onlineUsers.next(users);
    });
  }
}
