import { Injectable } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';
import { IRealTimeComunication } from '../interfaces/i-real-time-comunication';

@Injectable()
export class ManageTypingStatusUseCase {
  private typingSubject = new Subject<{ userId: string; text: string }>();

  constructor(private realTimeCommunication: IRealTimeComunication) {
    this.setupTypingDebounce();
  }
  private setupTypingDebounce(): void {
    this.typingSubject.pipe(debounceTime(300)).subscribe(({ userId, text }) => {
      const isTyping = text.length > 0;
      this.realTimeCommunication.setTypingStatus(userId, isTyping);
    });
  }

  notifyTyping(userId: string, text: string): void {
    this.typingSubject.next({ userId, text });
  }

  listenTypingStatus(): Observable<{ userId: string; isTyping: boolean }> {
    return this.realTimeCommunication.onTypingStatus();
  }
}
