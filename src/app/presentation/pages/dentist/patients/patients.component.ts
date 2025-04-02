import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Patient {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  lastVisit: Date;
  status: 'active' | 'pending' | 'inactive';
}

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
  expandedId: number | null = null;
  totalPatients = 0;
  todayAppointments = 0;

  patients: Patient[] = [];
  filteredPatients: Patient[] = [];

  ngOnInit() {

    this.patients = this.generateMockPatients();
    this.filteredPatients = [...this.patients];
    this.totalPatients = this.patients.length;
    this.todayAppointments = 5; // Simulado
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

  toggleExpand(id: number) {
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

  private generateMockPatients(): Patient[] {

    return [
      { id: 1, name: 'Russel', lastName: 'Pérez', phone: '1234567890', lastVisit: new Date(), status: 'active' },
      { id: 2, name: 'María', lastName: 'Gómez', phone: '0987654321', lastVisit: new Date(), status: 'pending' },
      { id: 3, name: 'Luis', lastName: 'Martínez', phone: '1122334455', lastVisit: new Date(), status: 'inactive' },
      { id: 4, name: 'Ana', lastName: 'López', phone: '2233445566', lastVisit: new Date(), status: 'active' },
      { id: 5, name: 'Carlos', lastName: 'Sánchez', phone: '3344556677', lastVisit: new Date(), status: 'pending' },

    ];
  }

  addNewPatient() {
    console.log('Agregar nuevo paciente');
  }

  viewDetails(patient: Patient) {
    console.log('Ver detalles', patient);
  }

  editPatient(patient: Patient) {
    console.log('Editar paciente', patient);
  }

  scheduleAppointment(patient: Patient) {
    console.log('Programar cita para:', patient);

  }

  openChat(patient: Patient) {
    console.log('Abrir chat con:', patient);

  }
}
