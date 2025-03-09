import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ApiConfig } from '../../infrastructure/config/app.config';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImJiMGZlOWMwLWM5YzAtNGRiZS1hM2RkLTk2OGYzZTc1NTQ2OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE3NDY2NjA2MjMsImlzcyI6ImFwaSIsImF1ZCI6ImNsaWVudGUifQ.1YGI6xD8XTU490tu8wLB-usfM-vLQ2VVo7lmYv5yXI8';
  constructor(
    private apiUrl: ApiConfig,
    private storageService: StorageService,
  ) {
    this.startConnection();
  }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(this.apiUrl.getEndpoint('chatHub'), {
      accessTokenFactory: () => this.token, 
      transport: signalR.HttpTransportType.WebSockets
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
