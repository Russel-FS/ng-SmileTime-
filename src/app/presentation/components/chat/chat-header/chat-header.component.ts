import { Component, Input } from '@angular/core';
import { UserEntity, UserRole } from '../../../../core/domain/model/chat/user-entity';
import { ConversationParticipant } from '../../../../core/domain/model/chat/conversation-participant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-header',
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css',
})
export class ChatHeaderComponent {
  @Input() userHeader!: ConversationParticipant;

}
