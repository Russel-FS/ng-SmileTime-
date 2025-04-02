import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dentist-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dentist-home.component.html',
  styleUrl: './dentist-home.component.css'
})
export class DentistHomeComponent {
  dentistName = 'Dr. Smith';
  currentDate = new Date();

  upcomingAppointments = [
    { patient: 'Russel flores', time: '09:00', type: 'Limpieza Dental' },
    { patient: 'Carlos López', time: '10:30', type: 'Revisión' },
    { patient: 'María Rodríguez', time: '11:45', type: 'Tratamiento' }
  ];

  statistics = [
    { title: 'Pacientes Hoy', value: '8', icon: 'people', color: 'bg-emerald-100 text-emerald-800' },
    { title: 'Citas Pendientes', value: '12', icon: 'event', color: 'bg-blue-100 text-blue-800' },
    { title: 'Tratamientos', value: '5', icon: 'medical_services', color: 'bg-purple-100 text-purple-800' },
    { title: 'Mensajes', value: '3', icon: 'mail', color: 'bg-amber-100 text-amber-800' }
  ];

  menuItems = [
    { title: 'Dashboard', route: '../dashboard', icon: 'dashboard', description: 'Vista general de la clínica' },
    { title: 'Pacientes', route: '../patients', icon: 'people', description: 'Gestión de pacientes' },
    { title: 'Calendario', route: '../calendar', icon: 'calendar_today', description: 'Agenda y citas' },
    { title: 'Chat', route: '../chat', icon: 'chat', description: 'Mensajes y consultas' }
  ];
}
