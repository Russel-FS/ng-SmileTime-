import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent {
  @Output() EventTyping = new EventEmitter<string>();
  @Output() EventSendMessage = new EventEmitter<string>();
  newMessage: string = '';
  sendMessage() {
    if (this.newMessage.trim()) {
      this.EventSendMessage.emit(this.newMessage);
      this.newMessage = '';
    }
  }

  onTyping() {
    this.EventTyping.emit(this.newMessage);
  }
}
