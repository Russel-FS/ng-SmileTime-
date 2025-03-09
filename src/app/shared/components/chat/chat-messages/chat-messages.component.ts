import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from '../../../../core/domain/models/messages';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-chat-messages',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ChatMessagesComponent implements AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  @Output() EventTyping = new EventEmitter<string>();
  @Output() EventSendMessage = new EventEmitter<string>();
  @Input() messages!: Message[];
  newMessage: string = '';

  onScroll(): void {
    this.checkScrollPosition();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private checkScrollPosition(): void {
    const container = this.messageContainer.nativeElement;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
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
