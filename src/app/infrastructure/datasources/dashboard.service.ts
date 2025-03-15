import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CiteEntity } from '../../core/domain/model/dashboard/cite-entity';
import { DataEntity } from '../../core/domain/model/dashboard/data-entity';
import { PacientEntity } from '../../core/domain/model/dashboard/pacient-entity';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'api/dashboard'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DataEntity> {
    return this.http.get<DataEntity>(`${this.apiUrl}/data`);
  }

  getAppointments(): Observable<CiteEntity[]> {
    return this.http.get<CiteEntity[]>(`${this.apiUrl}/appointments`);
  }

  getPatients(): Observable<PacientEntity[]> {
    return this.http.get<PacientEntity[]>(`${this.apiUrl}/patients`);
  }

  createAppointment(appointment: CiteEntity): Observable<CiteEntity> {
    return this.http.post<CiteEntity>(`${this.apiUrl}/appointments`, appointment);
  }

  updateAppointment(id: string, appointment: CiteEntity): Observable<CiteEntity> {
    return this.http.put<CiteEntity>(`${this.apiUrl}/appointments/${id}`, appointment);
  }

  deleteAppointment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/appointments/${id}`);
  }

  getTreatmentStats(): Observable<{
    cleanings: number;
    extractions: number;
    fillings: number;
  }> {
    return this.http.get<{
      cleanings: number;
      extractions: number;
      fillings: number;
    }>(`${this.apiUrl}/treatment-stats`);
  }

  getMonthlyAppointments(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/monthly-appointments`);
  }

  getMetrics(): Observable<{
    totalPatientsChange: number;
    newPatientsChange: number;
    pendingAppointmentsChange: number;
    completedTreatmentsChange: number;
  }> {
    return this.http.get<{
      totalPatientsChange: number;
      newPatientsChange: number;
      pendingAppointmentsChange: number;
      completedTreatmentsChange: number;
    }>(`${this.apiUrl}/metrics`);
  }
}
