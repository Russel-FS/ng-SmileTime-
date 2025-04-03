import { Component, Input } from '@angular/core';
import { TypingStatus } from '../../../../core/domain/entities/signalR/TypingStatus';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typing',
  imports: [CommonModule],
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.css'
})
export class TypingComponent {

  @Input() typing!: TypingStatus;

  getInitialsAvatar(typing: TypingStatus): string {
    const userName = typing.username || '?';
    const names = userName.trim().split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  }
}
