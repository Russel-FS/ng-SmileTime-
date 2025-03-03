import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-client-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-chat.component.html',
  styleUrl: './client-chat.component.css',
})
export class ClientChatComponent {
  messages: Message[] = [
    { text: 'Hola ¿En que puedo ayudarte?', isUser: false, timestamp: new Date() },
  ];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        isUser: true,
        timestamp: new Date(),
      });
      this.newMessage = '';

      // simulacion de delay para mensajes de repuesta-test
      setTimeout(() => {
        this.messages.push({
          text: '¡Hola! Estoy aquí para ayudarte con tu cuidado dental.',
          isUser: false,
          timestamp: new Date(),
        });
      }, 2000);
    }
  }
}
