import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ApiConfig } from '../../infrastructure/config/app.config';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';
import { Message } from '../domain/models/messages';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private messageReceived = new Subject<Message>();
  messageReceived$ = this.messageReceived.asObservable();

  constructor(
    private apiUrl: ApiConfig,
    private storageService: StorageService,
  ) {}

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.apiUrl.getEndpoint('chatHub'), {
        accessTokenFactory: () => this.storageService.getToken(),
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Coneccion iniciada');
        this.addReceiveMessageListener();
      })
      .catch((err) => console.log('Error al iniciar la coneccion: ' + err));
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => console.log('Coneccion detenida'))
        .catch((err) => console.log('Error al detener la coneccion: ' + err));
    }
  }

  /**
   * Establece un listener para recibir mensajes de SignalR. Cuando se recibe
   * un mensaje, se notifica a los subscriptores de `messageReceived$` con un
   * objeto `Message` que contiene el texto del mensaje
   */
  addReceiveMessageListener() {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      const newMessage: Message = {
        text: message,
        isUser: false,
        timestamp: new Date(),
      };
      this.messageReceived.next(newMessage);
    });
  }

  /**
   * Envia un mensaje a un usuario a traves del hub de SignalR. Si no se ha
   * establecido una coneccion con el hub, el mensaje no se envia.
   * @param message El texto del mensaje que se va a enviar.
   */
  sendMessage(user: string, message: string) {
    if (this.hubConnection) {
      this.hubConnection
        .invoke('SendMessage', user, message)
        .then(() => console.log('Mensaje enviado a', user))
        .catch((err) => console.log('Error al enviar el mensaje: ' + err));
    }
  }
}
