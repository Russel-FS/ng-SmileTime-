import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private apiHubUrl = 'https://turbo-doodle-q7pw5pwr6jww34rgr-5011.app.github.dev/chathub';
  constructor() {
    this.startConnection();
  }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(this.apiHubUrl).build();

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

  addReceiveMessageListener() {
    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      console.log('Mensaje recibido de', user, ':', message);
    });
  }

  sendMessage(user: string, message: string) {
    if (this.hubConnection) {
      this.hubConnection
        .invoke('SendMessage', user, message)
        .then(() => console.log('Mensaje enviado a', user))
        .catch((err) => console.log('Error al enviar el mensaje: ' + err));
    }
  }
}
