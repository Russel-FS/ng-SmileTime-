import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DentalManagement } from '../model/dental-management.model';
import { MockDentalService } from '../../../../infrastructure/datasources/dentist/mock-dental.service';
import { AddPatientModalComponent } from './add-patient-modal/add-patient-modal.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, FormsModule, AddPatientModalComponent],
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
  showAddModal = false;

  patients: DentalManagement[] = [];
  filteredPatients: DentalManagement[] = [];

  constructor(private dentalService: MockDentalService) { }

  ngOnInit() {
    this.dentalService.getPatients().subscribe(patients => {
      this.patients = patients;
      this.filteredPatients = [...this.patients];
      this.totalPatients = this.patients.length;
      this.todayAppointments = 5;
    });
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

  addNewPatient() {
    this.showAddModal = true;
  }

  onSaveNewPatient(patient: DentalManagement) {
    this.dentalService.addPatient(patient).subscribe(newPatient => { 
      this.dentalService.getPatients().subscribe(patients => {
        this.patients = patients;
        this.filteredPatients = [...this.patients];
        this.totalPatients = this.patients.length;
        this.showAddModal = false;
      });
    });
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
