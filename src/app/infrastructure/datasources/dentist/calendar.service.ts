import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DentalAppointment } from '../../../presentation/pages/dentist/model/dental-management.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor() { }
  /**
   * Obtiene una cita dental por su ID.
   * @param appointmentId - El ID de la cita a obtener.
   * @returns Un observable que emite la cita dental correspondiente al ID proporcionado.
   */
  addAppointment(appointment: DentalAppointment): Observable<boolean> {
    console.log('Agregando cita:', appointment);
    return of(true);
  }

  /**
   * Actualiza una cita dental.
   * @param appointment - La cita a actualizar.
   * @returns Un observable que emite true si la cita fue actualizada con éxito, o false en caso contrario.
   */
  updateAppointment(appointment: DentalAppointment): Observable<boolean> {
    console.log('Actualizando cita:', appointment);
    return of(true);
  }
  /**
   * Elimina una cita dental.
   * @param appointmentId - El ID de la cita a eliminar.
   * @returns Un observable que emite true si la cita fue eliminada con éxito, o false en caso contrario.
   */
  deleteAppointment(appointmentId: string): Observable<boolean> {
    console.log('Eliminando cita:', appointmentId);
    return of(true);
  }
  /**
   * Obtiene todas las citas dentales.
   * @returns Un observable que emite un array de citas dentales.
   */
  getAppointments(): Observable<DentalAppointment[]> {
    console.log('Obteniendo todas las citas');
    return of([]);
  }
}
