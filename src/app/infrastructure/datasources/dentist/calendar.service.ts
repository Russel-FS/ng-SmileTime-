import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DentalAppointment } from '../../../presentation/pages/dentist/model/dental-management.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor() { }

  addAppointment(appointment: DentalAppointment): Observable<boolean> {
    console.log('Agregando cita:', appointment);
    return of(true);
  }

  updateAppointment(appointment: DentalAppointment): Observable<boolean> {
    console.log('Actualizando cita:', appointment);
    return of(true);
  }

  deleteAppointment(appointmentId: string): Observable<boolean> {
    console.log('Eliminando cita:', appointmentId);
    return of(true);
  }

  getAppointments(): Observable<DentalAppointment[]> {
    console.log('Obteniendo todas las citas');
    return of([]);
  }
}
