import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConversationEntity } from '../domain/model/chat/conversation-entity';


@Injectable({
  providedIn: 'root'
})
export class ConversationCacheService {

  private conversationsCache = new Map<string, ConversationEntity>();
  private conversationsSubject = new BehaviorSubject<ConversationEntity[]>([]);

  addConversation(conversation: ConversationEntity): void {
    this.conversationsCache.set(conversation.id.toString(), conversation);
    this.notifyChanges();
  }

  getConversation(id: string | number): ConversationEntity | undefined {
    return this.conversationsCache.get(id.toString());
  }

  updateConversation(conversation: ConversationEntity): void {
    this.conversationsCache.set(conversation.id.toString(), conversation);
    this.notifyChanges();
  }

  getConversations(): Observable<ConversationEntity[]> {
    return this.conversationsSubject.asObservable();
  }

  private notifyChanges(): void {
    this.conversationsSubject.next(Array.from(this.conversationsCache.values()));
  }

}
