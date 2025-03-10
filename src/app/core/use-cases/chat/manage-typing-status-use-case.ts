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
} from 'rxjs';
import { IRealTimeComunication } from '../../interfaces/signalR/i-real-time-comunication';

@Injectable()
export class ManageTypingStatusUseCase {
  private typingSubject = new Subject<{ userId: string; text: string }>(); // Observable para notificar el estado de escritura
  private readonly TYPING_DEBOUNCE_TIME = 300; // 300ms de debounce
  private readonly STOP_TYPING_DELAY = 1000; // 1000ms de espera para detener el estado de typing
  private previousState = new Map<string, boolean>(); // almacenar el estado anterior de cada usuario

  constructor(private realTimeCommunication: IRealTimeComunication) {
    this.setupTypingDebounce();
  }
  /**
   * Configura el comportamiento de debouncing para la escritura.
   * Se encarga de procesar la escritura y emitir el estado actualizado
   * solo cuando el estado cambia.
   *
   * 1. Espera 300ms entre eventos de tecleo.
   * 2. Si el texto no esta vacio, espera 1000ms antes de detener el estado de "escribiendo".
   * 3. S olo emite si el estado cambia.
   * Tambi n almacena el estado anterior de cada usuario en una Map.
   */
  private setupTypingDebounce(): void {
    this.typingSubject
      .pipe(
        debounceTime(this.TYPING_DEBOUNCE_TIME),
        switchMap(({ userId, text }) => {
          const isTyping = text.length > 0;

          // Si no hay texto, inmediatamente marca como no escribiendo
          if (!isTyping) {
            return of({ userId, isTyping: false });
          }
          // Si hay texto, esperar 1000ms antes de detener el estado de "escribiendo"
          return timer(0, this.STOP_TYPING_DELAY).pipe(
            switchMap((index) => {
              return of({ userId, isTyping: index === 0 });
            }),
          );
        }),
        // solo emitir cuando el estado cambia
        distinctUntilChanged((prev, curr) => {
          const previousTypingState = this.previousState.get(curr.userId) ?? false;
          return previousTypingState === curr.isTyping;
        }),
        catchError((error) => {
          console.error('Error al procesar la escritura:', error);
          return of({ userId: '', isTyping: false });
        }),
      )
      .subscribe(({ userId, isTyping }) => {
        this.previousState.set(userId, isTyping); // actualizar el estado anterior
        this.realTimeCommunication.setTypingStatus(userId, isTyping); // notificar al servidor
      });
  }

  /**
   * Cuando el usuario escribe algo, se debe llamar a este m todo para
   * notificar el estado de escritura. La suscripci n a este observable
   * se encarga de procesar el evento de escritura y notificar el estado
   * de "escribiendo" o "no escribiendo" al servidor.
   */
  notifyTyping(userId: string, text: string): void {
    this.typingSubject.next({ userId, text });
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
