import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DentalManagement } from '../model/dental-management.model';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  searchTerm = '';
  viewMode: 'grid' | 'list' = 'grid';
  activeFilter = 'all';
  expandedId: number | string | null = null;
  totalPatients = 0;
  todayAppointments = 0;

  patients: DentalManagement[] = [];
  filteredPatients: DentalManagement[] = [];

  ngOnInit() {

    this.patients = this.generateMockPatients();
    this.filteredPatients = [...this.patients];
    this.totalPatients = this.patients.length;
    this.todayAppointments = 5;
  }

  filterPatients() {
    this.filteredPatients = this.patients.filter(patient => {
      const searchMatch = this.searchTerm.toLowerCase();
      return patient.name.toLowerCase().includes(searchMatch) ||
        patient.lastName.toLowerCase().includes(searchMatch) ||
        patient.phone.includes(searchMatch);
    });
  }

  filterBy(filter: string) {
    this.activeFilter = filter;
  }

  toggleExpand(id: number | string) {
    this.expandedId = this.expandedId === id ? null : id;
  }

  getAvatarColor(name: string): string {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
      '#FFEEAD', '#D4A5A5', '#9FA8DA', '#90A4AE'
    ];
    return colors[name.length % colors.length];
  }

  getInitials(name: string, lastName: string): string {
    return `${name.charAt(0)}${lastName.charAt(0)}`;
  }

  private generateMockPatients(): DentalManagement[] {

    return [
      new DentalManagement({
        id: "P001",  // Ahora podemos usar strings
        name: 'Russel',
        lastName: 'Pérez',
        phone: '1234567890',
        lastVisit: new Date(),
        status: 'active'
      }),
      new DentalManagement({
        id: 2,
        name: 'María',
        lastName: 'Gómez',
        phone: '0987654321',
        lastVisit: new Date(),
        status: 'pending'
      }),
      new DentalManagement({
        id: 3,
        name: 'Luis',
        lastName: 'Martínez',
        phone: '1122334455',
        lastVisit: new Date(),
        status: 'inactive'
      }),
      new DentalManagement({
        id: 4,
        name: 'Ana',
        lastName: 'López',
        phone: '2233445566',
        lastVisit: new Date(),
        status: 'active'
      }),
      new DentalManagement({
        id: 5,
        name: 'Carlos',
        lastName: 'Sánchez',
        phone: '3344556677',
        lastVisit: new Date(),
        status: 'pending'
      }),

    ];
  }

  addNewPatient() {
    console.log('Agregar nuevo paciente');
  }

  viewDetails(patient: DentalManagement) {
    console.log('Ver detalles', patient);
  }

  editPatient(patient: DentalManagement) {
    console.log('Editar paciente', patient);
  }

  scheduleAppointment(patient: DentalManagement) {
    console.log('Programar cita para:', patient);

  }

  openChat(patient: DentalManagement) {
    console.log('Abrir chat con:', patient);

  }
}
