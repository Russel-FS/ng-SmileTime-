import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DentalAppointment } from '../../../presentation/pages/dentist/model/dental-management.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private mockAppointments: DentalAppointment[] = [
    {
      id: '1',
      date: new Date(new Date().setHours(9, 0, 0)),
      time: '09:00',
      type: 'limpieza',
      status: 'pendiente',
      duration: 30,
      notes: 'Primera limpieza dental',
    },
    {
      id: '2',
      date: new Date(new Date().setHours(11, 30, 0)),
      time: '11:30',
      type: 'consulta',
      status: 'pendiente',
      duration: 45,
      notes: 'Revisión general',
    },
    {
      id: '3',
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: '14:00',
      type: 'tratamiento',
      status: 'pendiente',
      duration: 60,
      notes: 'Tratamiento de conducto',
    }
  ];

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
    console.log('Obteniendo todas las citas:', this.mockAppointments);
    return of(this.mockAppointments);
  }
}
