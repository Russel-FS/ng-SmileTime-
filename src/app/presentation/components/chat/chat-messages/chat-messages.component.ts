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
import { UserEntity, UserRole } from '../../../../core/domain/model/chat/user-entity';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { TypingComponent } from '../typing/typing.component';
import { MessageEntity, MessageType } from '../../../../core/domain/model/chat/message-entity';
import { Status } from '../../../../core/domain/model/chat/message-status';
import { ChatHeaderComponent } from "../chat-header/chat-header.component";
import { mockMessageStatus } from '../../../../core/domain/model/chat/__mocks__/message-status.mock';
import { mockAttachments } from '../../../../core/domain/model/chat/__mocks__/attachment.mock';
import { mockParticipant } from '../../../../core/domain/model/chat/__mocks__/conversation-participant.mock';

@Component({
  selector: 'app-chat-messages',
  imports: [FormsModule, CommonModule, TypingComponent, ChatHeaderComponent],
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
  @Input() messages!: MessageEntity[];
  @Input() isTyping: boolean = false;
  newMessage: string = '';

  onScroll(): void {
    this.checkScrollPosition();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  constructor() {
    this.messages = [
      {
        id: '1',
        sender: mockParticipant,
        content: 'hola como  estas',
        type: MessageType.TEXT,
        status: [mockMessageStatus],
        createdAt: new Date(),
        modifiedAt: new Date(),
        attachments: mockAttachments,
        isDeleted: false,
      },
      {
        id: '2',
        sender: mockParticipant,
        content: 'Estoy bien gracias',
        type: MessageType.TEXT,
        status: [mockMessageStatus],
        createdAt: new Date(),
        modifiedAt: new Date(),
        attachments: mockAttachments,
        isDeleted: false,
      }
    ];
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
  sendMessage() {
    if (this.newMessage.trim()) {
      this.EventSendMessage.emit(this.newMessage);
      this.newMessage = '';
    }
  }
  onTyping() {
    this.EventTyping.emit(this.newMessage);
  }

  isUserMessage(message: MessageEntity): boolean {
    return message.status.some((element) => element.status === Status.SENT);
  }
  trackByMessageId(message: MessageEntity): string {
    return message?.id.toString() || message.createdAt.getTime().toString();
  }
}
