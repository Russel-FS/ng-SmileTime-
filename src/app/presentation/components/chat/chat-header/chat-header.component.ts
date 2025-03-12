import { Component, Input } from '@angular/core';
import { UserEntity, UserRole } from '../../../../core/domain/model/chat/user-entity';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.css',
})
export class ChatHeaderComponent {
  @Input() user!: UserEntity;

  constructor() {
    this.user = new UserEntity(
      1,
      'Russel',
      'smith@hospital.com',
      'https://randomuser.me/api/portraits/men/1.jpg',
      'patient' as UserRole,
      new Date(),
      true,
      new Date()
    
    );
  }


}
