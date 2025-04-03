import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import { TypingStatus } from '../../domain/entities/signalR/TypingStatus';
import { PrivateMessage } from '../../domain/entities/signalR/PrivateMessage';
import { OnlineUser } from '../../domain/entities/signalR/OnlineUser';

export interface IRealTimeComunication {
  connect(): void;
  disconnect(): void;
  // mensajes
  onMessage(): Observable<PrivateMessage>;
  sendMessage(message: PrivateMessage): void;

  //estado de typing
  onTypingStatus(): Observable<TypingStatus>;
  setTypingStatus(typingStatus: TypingStatus): void;

  // usuarios en linea
  getOnlineUsers(): void;
  onOnlineUsers(): Observable<OnlineUser[]>;
  // usuario conectado
  onUserConnected(): Observable<OnlineUser>;
  // usuario desconectado
  onUserDisconnected(): Observable<OnlineUser>;
}
export const IRealTimeComunication = new InjectionToken<IRealTimeComunication>(
  'RealTimeComunication',
);
