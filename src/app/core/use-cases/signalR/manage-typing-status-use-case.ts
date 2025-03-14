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

@Injectable()
export class ManageTypingStatusUseCase {
  private typingSubject = new Subject<{ userId: string | number; isTyping: boolean }>(); // Observable para notificar el estado de escritura
  private readonly TYPING_DEBOUNCE_TIME = 300; // 300ms de debounce


  constructor(private realTimeCommunication: IRealTimeComunication) {
    this.setupTypingDebounce();
  }

  private setupTypingDebounce(): void {
    this.typingSubject
      .pipe(
        debounceTime(this.TYPING_DEBOUNCE_TIME),
        switchMap(({ userId, isTyping }) => {
          if (isTyping) {
            return timer(0, 1500).pipe(
              map((index) => ({
                userId,
                isTyping: index === 0,
              }
              )),
            );
          }
          return of({ userId, isTyping });
        }),
        distinctUntilChanged((prev, curr) =>
          prev.isTyping === curr.isTyping && prev.userId === curr.userId,
        ),
        catchError((error) => {
          console.error('Error al procesar la escritura:', error);
          return of({ userId: '', isTyping: false });
        }),
      )
      .subscribe(({ userId, isTyping }) => {
        // console.log(isTyping ? 'El usuario está escribiendo...' : 'El usuario dejó de escribir.'); // 🖨️ Mostrar en consola
        this.realTimeCommunication.setTypingStatus(userId, isTyping);
      });
  }

  /**
   * Cuando el usuario escribe algo, se debe llamar a este m todo para
   * notificar el estado de escritura. La suscripci n a este observable
   * se encarga de procesar el evento de escritura y notificar el estado
   * de "escribiendo" o "no escribiendo" al servidor.
   */
  notifyTyping(userId: string | number, isTyping: boolean): void {
    this.typingSubject.next({ userId, isTyping });
  }

  /**
   * Devuelve un observable que se suscribe al estado de escritura en el chat.
   * Cada vez que un usuario comienza o deja de escribir, se emite un objeto
   * con el userId correspondiente y una propiedad "isTyping" que indica
   * si el usuario est  escribiendo o no.
   */
  listenTypingStatus(): Observable<{ userId: string; isTyping: boolean }> {
    return this.realTimeCommunication.onTypingStatus();
  }
}
