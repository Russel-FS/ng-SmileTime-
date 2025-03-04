import { Component, Input } from '@angular/core';
import { Contact } from '../../../../core/domain/models/contact';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css',
})
export class ChatHeaderComponent {
  @Input() contact!: Contact;
}
