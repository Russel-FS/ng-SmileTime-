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
import { MessageEntity } from '../../../../core/domain/entities/chat/message-entity';
import { StorageService } from '../../../../core/services/storage/storage.service';

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
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ],
})
export class ChatMessagesComponent implements AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  @Input() messages!: MessageEntity[];
  @Input() isTyping: boolean = false;
  @Input() hasSelectedContact: boolean = false;
  @Input() isLoading: boolean = false;
  private currentUserId: string | null = null;

  constructor(private storageService: StorageService) {
    this.currentUserId = this.storageService.getItem('userId');
  }

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

  trackByMessageId(message: MessageEntity): string {
    return message?.id?.toString() || message.createdAt.getTime().toString();
  }

  isUserMessage(message: MessageEntity): boolean {
    if (!message || !message.sender.userId || !this.currentUserId) {
      return false;
    }
    return message.sender.userId?.toString() === this.currentUserId.toString();
  }

  getInitialsAvatar(userName: string): string {
    if (!userName) return '?';

    const names = userName.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  }
}
