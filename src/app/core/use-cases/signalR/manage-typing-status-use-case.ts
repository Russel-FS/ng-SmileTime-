import { Injectable } from '@angular/core';
import {
  debounceTime,
  Observable,
  Subject,
  distinctUntilChanged,
  switchMap,
  timer,
  of,
  catchError,
  map,
} from 'rxjs';
import { IRealTimeComunication } from '../../interfaces/signalR/i-real-time-comunication';
import { TypingStatus } from '../../domain/model/TypingStatus';

@Injectable()
export class ManageTypingStatusUseCase {
  private typingSubject = new Subject<TypingStatus>(); // Observable para notificar el estado de escritura
  private readonly TYPING_DEBOUNCE_TIME = 300; // 300ms de debounce


  constructor(private realTimeCommunication: IRealTimeComunication) {
    this.setupTypingDebounce();
  }

  private setupTypingDebounce(): void {
    this.typingSubject
      .pipe(
        debounceTime(this.TYPING_DEBOUNCE_TIME),
        switchMap((typingStatus: TypingStatus) => {
          if (typingStatus.isTyping) {
            return timer(0, 1500).pipe(
              map((index) => ({
                ...typingStatus,
                isTyping: index === 0,
              }
              )),
            );
          }
          return of(typingStatus);
        }),
        distinctUntilChanged((prev, curr) =>
          prev.isTyping === curr.isTyping &&
          prev.senderId === curr.senderId &&
          prev.receiverId === curr.receiverId &&
          prev.conversationId === curr.conversationId,
        ),
        catchError((error) => {
          console.error('Error al procesar la escritura:', error);
          return of({
            senderId: '',
            receiverId: '',
            isTyping: false,
            conversationId: 0,
          } as TypingStatus);
        }),
      )
      .subscribe((typingStatus: TypingStatus) => {
        this.realTimeCommunication.setTypingStatus(typingStatus);
      });
  }

  /**
   * Cuando el usuario escribe algo, se debe llamar a este m todo para
   * notificar el estado de escritura. La suscripci n a este observable
   * se encarga de procesar el evento de escritura y notificar el estado
   * de "escribiendo" o "no escribiendo" al servidor.
   */
  notifyTyping(typingStatus: TypingStatus): void {
    this.typingSubject.next(typingStatus);
  }

  /**
   * Devuelve un observable que se suscribe al estado de escritura en el chat.
   * Cada vez que un usuario comienza o deja de escribir, se emite un objeto
   * con el userId correspondiente y una propiedad "isTyping" que indica
   * si el usuario est  escribiendo o no.
   */
  listenTypingStatus(): Observable<TypingStatus> {
    return this.realTimeCommunication.onTypingStatus();
  }
}
