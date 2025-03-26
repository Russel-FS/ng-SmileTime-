import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { MessageEntityDTO } from '../../../data/dto/message-DTO';
import { IMessageDatasource } from '../../../core/interfaces/datasource/auth/i-message-datasource';
import { StorageService } from '../../../core/services/storage/storage.service';
import { ApiConfig } from '../../config/app.config';


@Injectable({
  providedIn: 'root',
})
export class MessageDataSource implements IMessageDatasource {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private api: ApiConfig
  ) { }

  //test datos de prueba
  getMessages(): Observable<MessageEntityDTO[]> {
    throw new Error('Method not implemented.');
  }

  getMessage(id: string): Observable<MessageEntityDTO> {
    throw new Error('Method not implemented.');
  }

  sendMessage(message: MessageEntityDTO): Observable<MessageEntityDTO> {
    console.log('Mensaje enviada', JSON.stringify(message, null, 2));
    const url = this.api.getEndpoint('chat', 'createMessage');
    return this.http.post<MessageEntityDTO>(
      url,
      message,
      {
        headers: this.storage.getAuthHeaders()
      }
    ).pipe(
      catchError(error => {
        console.error('Error en sendMessage:', error);
        throw error;
      })
    );
  }
}
