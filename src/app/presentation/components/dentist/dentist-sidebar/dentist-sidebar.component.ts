import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dentist-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dentist-sidebar.component.html',
  styleUrl: './dentist-sidebar.component.css'
})
export class DentistSidebarComponent {
  nuevoPaciente() {
    // Implementar la lógica para crear nuevo paciente
    console.log('Crear nuevo paciente');
  }
}
