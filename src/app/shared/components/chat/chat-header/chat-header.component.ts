import { Component, Input } from '@angular/core';
import { ContactMessage } from '../../../../core/domain/models/contact-message';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css',
})
export class ChatHeaderComponent {
  @Input() contact!: ContactMessage;
}
