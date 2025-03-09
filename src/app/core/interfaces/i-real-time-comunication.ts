import { Observable } from 'rxjs';
import { Message } from '../domain/models/messages';
import { InjectionToken } from '@angular/core';

export interface IRealTimeComunication {
  connect(): void;
  disconnect(): void;
  // mensajes
  onMessage(): Observable<Message>;
  sendMessage(message: Message): void;

  //estado de typing
  onTypingStatus(): Observable<{ userId: string; isTyping: boolean }>;
  setTypingStatus(userId: string, isTyping: boolean): void;
}
export const IRealTimeComunication = new InjectionToken<IRealTimeComunication>(
  'RealTimeComunication',
);
