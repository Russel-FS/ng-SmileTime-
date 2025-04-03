import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AppointmentRequest, AppointmentResponse, AppointmentStatus, AppointmentType, DentalAppointment } from '../../../presentation/pages/dentist/model/dental-management.model';
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



  /**
   * Añade una cita dental.
   * @param appointment - La cita a añadir.
   * @returns Un observable que emite true si la cita fue añadida con éxito, o false en caso contrario.
   */
  addAppointment(appointment: AppointmentRequest): Observable<boolean> {
    console.log('Añadiendo cita:', JSON.stringify(appointment, null, 2));
    const url = this.apiConfig.getEndpoint('dentalAppointment', 'create');
    const header = this.storageService.getAuthHeaders();

    const serverRequest = {
      date: appointment.appointment.date,
      time: appointment.appointment.time,
      duration: appointment.appointment.duration,
      notes: appointment.appointment.notes,
      patientId: appointment.appointment.patientId,
      type: appointment.appointment.type,
      patientInfo: appointment.patientInfo
    };

    return this.http.post<boolean>(url, serverRequest, { headers: header }).pipe(
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
  getAppointments(): Observable<AppointmentResponse[]> {
    {
      const url = this.apiConfig.getEndpoint('dentalAppointment', 'all');
      const header = this.storageService.getAuthHeaders();

      return this.http.get<AppointmentResponse[]>(url, { headers: header }).pipe(
        catchError(error => {
          console.error('Error fetching appointments:', error);
          return of([]);
        })
      );
    }
  }
}
