import { Component, OnInit, LOCALE_ID, AfterViewInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { CalendarService } from '../../../../infrastructure/datasources/dentist/calendar.service';

registerLocaleData(localeEs, 'es');

interface Appointment {
  patientId: string;
  patientName: string;
  date: Date;
  time: string;
  type: 'limpieza' | 'consulta' | 'tratamiento';
  status: 'pendiente' | 'confirmada' | 'cancelada';
  duration: number;
  notes?: string;
  patientPhone?: string;
}

@Component({
  selector: 'app-appointment-scheduling',
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-scheduling.component.html',
  styleUrls: ['./appointment-scheduling.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, CalendarService]
})
export class AppointmentSchedulingComponent implements OnInit, AfterViewInit {
  appointments: Appointment[] = [];
  selectedDate: Date = new Date();
  filterStatus: string = 'all';
  isAddModalOpen = false;
  workingHours = {
    start: 8,
    end: 18
  };

  constructor(private calendarService: CalendarService) {

  }

  ngOnInit() {

  }
  ngAfterViewInit() {
    this.loadAppointments();
  }

  changeDate(days: number) {
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + days);
    this.selectedDate = newDate;
    this.loadAppointments();
  }

  loadAppointments() {
    this.calendarService.getAppointments().subscribe(
      {
        next: (appointments) => {
          this.appointments = appointments.map(response => ({
            patientId: response.appointment.patientId,
            patientName: response.patientInfo.name,
            date: new Date(response.appointment.date),
            time: response.appointment.time,
            type: response.appointment.type,
            status: this.mapStatus(response.appointment.status),
            duration: response.appointment.duration,
            notes: response.appointment.notes,
            patientPhone: response.patientInfo.phone
          })).filter(apt =>
            apt.date.toDateString() === this.selectedDate.toDateString()
          );
        },
        error: (error) => {
          console.error('Error loading appointments:', error);
        }
      }
    );
  }

  private mapStatus(serverStatus: string): 'pendiente' | 'confirmada' | 'cancelada' {
    switch (serverStatus.toLowerCase()) {
      case 'pending': return 'pendiente';
      case 'confirmed': return 'confirmada';
      case 'cancelled': return 'cancelada';
      default: return 'pendiente';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pendiente': return 'var(--appointment-pending)';
      case 'confirmada': return 'var(--appointment-confirmed)';
      case 'cancelada': return 'var(--appointment-cancelled)';
      default: return '#gray';
    }
  }

  addAppointment() {
    console.log('Agregar nueva cita');
  }

  confirmAppointment(id: number | string) {
    console.log('Confirmar cita:', id);
  }

  cancelAppointment(id: number | string) {
    console.log('Cancelar cita:', id);
  }

  rescheduleAppointment(id: number | string) {
    console.log('Reprogramar cita:', id);
  }

  toggleAppointmentStatus(appointment: Appointment) {
    if (appointment.status === 'pendiente') {
      appointment.status = 'confirmada';
    } else if (appointment.status === 'confirmada') {
      appointment.status = 'cancelada';
    } else {
      appointment.status = 'pendiente';
    }
  }
}
