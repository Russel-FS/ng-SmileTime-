import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AppointmentRequest, DentalAppointment } from '../../../presentation/pages/dentist/model/dental-management.model';
import { HttpClient } from '@angular/common/http';  // Cambiado desde @microsoft/signalr
import { ApiConfig } from '../../config/app.config';
import { StorageService } from '../../../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig,
    private storageService: StorageService,
  ) { }

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

  /**
   * Añade una cita dental.
   * @param appointment - La cita a añadir.
   * @returns Un observable que emite true si la cita fue añadida con éxito, o false en caso contrario.
   */
  addAppointment(appointment: AppointmentRequest): Observable<boolean> {
    console.log('Añadiendo cita:', JSON.stringify(appointment, null, 2));
    const url = this.apiConfig.getEndpoint('dentalAppointment', 'create');
    // Transformar el formato de la petición
    const serverRequest = {
      date: appointment.appointment.date,
      time: appointment.appointment.time,
      duration: appointment.appointment.duration,
      notes: appointment.appointment.notes,
      patientId: appointment.appointment.patientId,
      type: appointment.appointment.type,
      patientInfo: appointment.patientInfo
    };

    return this.http.post<boolean>(url, serverRequest).pipe(
      map(response => {
        console.log('Cita añadida:', response);
        return true;
      }),
      catchError(error => {
        console.error('Error al añadir cita:', error);
        return of(false);
      })
    );
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
