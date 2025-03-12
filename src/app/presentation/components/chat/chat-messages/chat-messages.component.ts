import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { TypingComponent } from '../typing/typing.component';
import { MessageEntity } from '../../../../core/domain/model/chat/message-entity';
import { Status } from '../../../../core/domain/model/chat/message-status';

@Component({
  selector: 'app-chat-messages',
  imports: [FormsModule, CommonModule, TypingComponent],
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
  @Input() messages!: MessageEntity[];
  @Input() isTyping: boolean = false;

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
    } catch (err) { }
  }
  isUserMessage(message: MessageEntity): boolean {
    return message.status.some((element) => element.status === Status.SENT);
  }
  trackByMessageId(message: MessageEntity): string {
    return message?.id.toString() || message.createdAt.getTime().toString();
  }
}
