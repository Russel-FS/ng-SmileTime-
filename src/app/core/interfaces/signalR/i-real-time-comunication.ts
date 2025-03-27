import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { MessageEntity } from '../../domain/entities/chat/message-entity';
import { ConversationEntity } from '../../domain/entities/chat/conversation-entity';

export interface IRealTimeComunication {
  connect(): void;
  disconnect(): void;
  // mensajes
  onMessage(): Observable<MessageEntity>;
  sendMessage(message: MessageEntity): void;

  //estado de typing
  onTypingStatus(): Observable<{ userId: string | number; isTyping: boolean }>;
  setTypingStatus(userId: string | number, isTyping: boolean): void;
}
export const IRealTimeComunication = new InjectionToken<IRealTimeComunication>(
  'RealTimeComunication',
);
