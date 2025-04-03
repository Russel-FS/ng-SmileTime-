import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DentalManagement } from '../../model/dental-management.model';

@Component({
    selector: 'app-medical-history-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="modal-overlay" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <header class="modal-header">
          <div class="header-content">
            <i class="material-icons">history</i>
            <h2>Historial Médico - {{patient.name}} {{patient.lastName}}</h2>
          </div>
          <button class="close-button" (click)="close.emit()">
            <i class="material-icons">close</i>
          </button>
        </header>

        <div class="modal-body">
          <div class="history-section">
            <h3>Información General</h3>
            <div class="info-grid">
              <div class="info-item">
                <label>Alergias:</label>
                <p>{{patient.allergies || 'No registradas'}}</p>
              </div>
              <div class="info-item">
                <label>Notas Médicas:</label>
                <p>{{patient.medicalNotes || 'Sin notas médicas'}}</p>
              </div>
            </div>
          </div>

          <div class="history-section">
            <h3>Historial de Visitas</h3>
            <div class="visits-timeline">
              @for (visit of mockVisits; track visit.date) {
                <div class="visit-card">
                  <div class="visit-header">
                    <span class="visit-date">
                      <i class="material-icons">event</i>
                      {{visit.date | date:'dd MMM yyyy'}}
                    </span>
                    <span class="visit-type">{{visit.type}}</span>
                  </div>
                  <div class="visit-details">
                    <p><strong>Procedimiento:</strong> {{visit.procedure}}</p>
                    <p><strong>Dentista:</strong> {{visit.dentist}}</p>
                    <p><strong>Notas:</strong> {{visit.notes}}</p>
                  </div>
                </div>
              } @empty {
                <p class="no-visits">No hay visitas registradas</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      padding: 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .history-section {
      padding: 20px;
      border-bottom: 1px solid #e9ecef;
    }

    .history-section h3 {
      color: #2196F3;
      margin-bottom: 16px;
    }

    .info-grid {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }

    .info-item label {
      font-weight: 500;
      color: #495057;
      display: block;
      margin-bottom: 8px;
    }

    .visits-timeline {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .visit-card {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .visit-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .visit-date {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #2196F3;
    }

    .visit-type {
      background: #e3f2fd;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.9em;
      color: #1976d2;
    }

    .visit-details p {
      margin: 8px 0;
    }

    .no-visits {
      text-align: center;
      color: #6c757d;
      padding: 20px;
    }
  `]
})
export class MedicalHistoryModalComponent {
    @Input() patient!: DentalManagement;
    @Output() close = new EventEmitter<void>();

    // Datos de ejemplo para el historial
    mockVisits = [
        {
            date: new Date('2024-01-15'),
            type: 'Limpieza Dental',
            procedure: 'Limpieza y revisión general',
            dentist: 'Dr. García',
            notes: 'Limpieza rutinaria completada. Sin problemas detectados.'
        },
        {
            date: new Date('2023-12-01'),
            type: 'Tratamiento',
            procedure: 'Empaste dental',
            dentist: 'Dra. Rodríguez',
            notes: 'Empaste en molar superior derecho. Seguimiento en 6 meses.'
        }
    ];
}
