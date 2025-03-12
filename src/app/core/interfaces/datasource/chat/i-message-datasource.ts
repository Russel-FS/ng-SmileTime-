import { Observable } from "rxjs";
import { MessageEntityDTO } from "../../../../data/dto/message-DTO";
import { InjectionToken } from "@angular/core";

export interface IMessageDatasource {
  getMessageById(conversationId: string | number): Observable<MessageEntityDTO>;
  create(message: MessageEntityDTO): Observable<MessageEntityDTO>;
  markAsRead(messageId: string, userId: number): Observable<void>;
  getMessages(conversationId: string | number, limit: number): Observable<MessageEntityDTO[]>;
  watchNewMessages(conversationId: string): Observable<MessageEntityDTO>;
}

export const IMessageDatasource = new InjectionToken<IMessageDatasource>('MessageDataSource');