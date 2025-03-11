import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { MessageEntity } from '../../domain/model/chat/message-entity';
import { ConversationEntity } from '../../domain/model/chat/conversation-entity';

export interface IRealTimeComunication {
  connect(): void;
  disconnect(): void;
  // mensajes
  onMessage(): Observable<ConversationEntity>;
  sendMessage(message: ConversationEntity): void;

  //estado de typing
  onTypingStatus(): Observable<{ userId: string; isTyping: boolean }>;
  setTypingStatus(userId: string, isTyping: boolean): void;
}
export const IRealTimeComunication = new InjectionToken<IRealTimeComunication>(
  'RealTimeComunication',
);
