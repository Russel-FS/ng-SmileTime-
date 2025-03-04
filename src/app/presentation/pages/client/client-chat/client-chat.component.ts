import { Component, ViewChild, ElementRef, AfterViewChecked, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChatSidebarComponent } from '../../../../shared/components/chat/chat-sidebar/chat-sidebar.component';
import { ContactMessage } from '../../../../core/domain/models/contact-message';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-client-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, ChatSidebarComponent],
  templateUrl: './client-chat.component.html',
  styleUrl: './client-chat.component.css',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class ClientChatComponent implements AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  messages: Message[] = [
    { text: 'Hola Dr. Flores Solano, ¿en que puedo ayudar?', isUser: false, timestamp: new Date() },
  ];
  newMessage: string = '';
  searchQuery: string = '';
  isTyping: boolean = false;

  contacts: ContactMessage[] = [
    {
      id: 1,
      name: 'Flores',
      role: 'Dentista',
      avatar: 'icons/user-profile.svg',
      status: 'online',
      lastMessage: 'Your appointment is confirmed',
      unread: 2,
      isActive: true,
    },
    {
      id: 2,
      name: 'James',
      role: 'Dentista',
      avatar: 'icons/user-profile.svg',
      status: 'offline',
      lastMessage: 'Please check your treatment plan',
      unread: 0,
    },
    {
      id: 3,
      name: 'Mallca',
      role: 'soperte',
      avatar: 'icons/user-profile.svg',
      status: 'online',
      lastMessage: 'Your records are ready',
      unread: 1,
    },
  ];
  onScroll(): void {
    this.checkScrollPosition();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop =
        this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  onContactClick(contact: ContactMessage) {
    this.contacts.forEach((c) => (c.isActive = false));
    contact.isActive = true;
    contact.unread = 0;
  }

  private checkScrollPosition(): void {
    const container = this.messageContainer.nativeElement;
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      // marcar como escribiendo
      const activeContact = this.contacts.find((c) => c.isActive);
      if (activeContact) activeContact.status = 'typing';

      // agregar mensaje
      this.messages.push({
        text: this.newMessage,
        isUser: true,
        timestamp: new Date(),
      });
      this.newMessage = '';

      // simular respuesta
      setTimeout(() => {
        if (activeContact) activeContact.status = 'online';
        this.messages.push({
          text: '¡Claro! ¿En qué puedo ayudarte?',
          isUser: false,
          timestamp: new Date(),
        });
      }, 2000);
    }
  }
}
