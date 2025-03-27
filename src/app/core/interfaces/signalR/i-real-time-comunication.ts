import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { MessageEntity } from '../../domain/entities/chat/message-entity';
import { ConversationEntity } from '../../domain/entities/chat/conversation-entity';
import { TypingStatus } from '../../domain/entities/signalR/TypingStatus';
import { PrivateMessage } from '../../domain/entities/signalR/PrivateMessage';

export interface IRealTimeComunication {
  connect(): void;
  disconnect(): void;
  // mensajes
  onMessage(): Observable<PrivateMessage>;
  sendMessage(message: PrivateMessage): void;

  //estado de typing
  onTypingStatus(): Observable<TypingStatus>;
  setTypingStatus(typingStatus: TypingStatus): void;
}
export const IRealTimeComunication = new InjectionToken<IRealTimeComunication>(
  'RealTimeComunication',
);
