import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';

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
    return [
      {
        id: 1,
        patientName: 'Russel Pérez',
        date: new Date(),
        time: '09:00',
        type: 'consulta',
        status: 'pendiente',
        duration: 30,
        patientPhone: '999-888-777',
        notes: 'Primera consulta'
      },
      {
        id: 2,
        patientName: 'María García',
        date: new Date(),
        time: '10:00',
        type: 'limpieza',
        status: 'confirmada',
        duration: 60,
        patientPhone: '999-777-666'
      },
      {
        id: 3,
        patientName: 'Carlos López',
        date: new Date(),
        time: '11:30',
        type: 'tratamiento',
        status: 'pendiente',
        duration: 45,
        patientPhone: '999-666-555',
        notes: 'Tratamiento de conducto'
      }
    ];
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
