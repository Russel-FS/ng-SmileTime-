import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { DentalManagement } from '../model/dental-management.model';

registerLocaleData(localeEs, 'es');

interface Appointment {
  id: number;
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
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment-scheduling.component.html',
  styleUrls: ['./appointment-scheduling.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class AppointmentSchedulingComponent implements OnInit {
  patients: DentalManagement[] = [];
  appointments: Appointment[] = [];
  selectedDate: Date = new Date();
  filterStatus: string = 'all';
  isAddModalOpen = false;
  workingHours = {
    start: 8,
    end: 18
  };

  ngOnInit() {
    this.loadAppointments();
  }

  changeDate(days: number) {
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + days);
    this.selectedDate = newDate;
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointments = this.getMockAppointments().filter(apt =>
      apt.date.toDateString() === this.selectedDate.toDateString()
    );
  }

  getMockAppointments(): Appointment[] {
    const patient = new DentalManagement({
      id: 1,
      name: 'Russel',
      lastName: 'Pérez',
      phone: '999-888-777',
      status: 'active',
      appointments: [{
        id: 1,
        date: new Date(),
        time: '09:00',
        type: 'consulta',
        status: 'pendiente',
        duration: 30,
        notes: 'Primera consulta'
      }]
    });

    return (patient.appointments || []).map(apt => ({
      id: apt.id,
      patientName: patient.fullName,
      date: apt.date,
      time: apt.time,
      type: apt.type,
      status: apt.status,
      duration: apt.duration,
      notes: apt.notes,
      patientPhone: patient.phone
    }));
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

  confirmAppointment(id: number) {
    console.log('Confirmar cita:', id);
  }

  cancelAppointment(id: number) {
    console.log('Cancelar cita:', id);
  }

  rescheduleAppointment(id: number) {
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
