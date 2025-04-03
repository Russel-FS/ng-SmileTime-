import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DentalManagement } from '../../model/dental-management.model';

@Component({
    selector: 'app-edit-patient-modal',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="modal-overlay" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <header class="modal-header">
          <div class="header-content">
            <i class="material-icons">edit</i>
            <h2>Editar Paciente</h2>
          </div>
          <button class="close-button" (click)="close.emit()">
            <i class="material-icons">close</i>
          </button>
        </header>

        <div class="modal-body">
          <form (ngSubmit)="onSubmit()" #form="ngForm">
            <div class="form-section">
              <h3>Información Personal</h3>
              <div class="form-row">
                <div class="form-group">
                  <label>Nombre</label>
                  <input type="text" [(ngModel)]="editingPatient.name" name="name" required>
                </div>
                <div class="form-group">
                  <label>Apellido</label>
                  <input type="text" [(ngModel)]="editingPatient.lastName" name="lastName" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Teléfono</label>
                  <input type="tel" [(ngModel)]="editingPatient.phone" name="phone" required>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" [(ngModel)]="editingPatient.email" name="email">
                </div>
              </div>
            </div>

            <div class="form-section">
              <h3>Información Médica</h3>
              <div class="form-group">
                <label>Alergias</label>
                <textarea [(ngModel)]="editingPatient.allergies" name="allergies" rows="2"></textarea>
              </div>
              <div class="form-group">
                <label>Notas Médicas</label>
                <textarea [(ngModel)]="editingPatient.medicalNotes" name="medicalNotes" rows="2"></textarea>
              </div>
            </div>

            <div class="button-group">
              <button type="button" class="secondary" (click)="close.emit()">
                <i class="material-icons">close</i>
                Cancelar
              </button>
              <button type="submit" [disabled]="!form.valid" class="primary">
                <i class="material-icons">save</i>
                Guardar Cambios
              </button>
            </div>
          </form>
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
      animation: fadeIn 0.2s ease-in;
    }

    .modal-content {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
    }

    .modal-header {
      padding: 20px;
      background: #f8f9fa;
      border-bottom: 1px solid #e9ecef;
      border-radius: 12px 12px 0 0;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-content i {
      font-size: 28px;
      color: #2196F3;
    }

    .modal-body {
      padding: 24px;
    }

    .form-section {
      margin-bottom: 24px;
    }

    .form-section h3 {
      color: #2196F3;
      font-size: 1.1em;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e9ecef;
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .form-group {
      flex: 1;
      margin-bottom: 16px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #495057;
      font-weight: 500;
    }

    input, textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ced4da;
      border-radius: 6px;
      transition: border-color 0.2s;
    }

    input:focus, textarea:focus {
      outline: none;
      border-color: #2196F3;
      box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
    }

    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    button.primary {
      background: #2196F3;
      color: white;
    }

    button.secondary {
      background: #e9ecef;
      color: #495057;
    }

    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from { transform: translateY(-20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class EditPatientModalComponent {
    @Input() patient!: DentalManagement;
    @Output() close = new EventEmitter<void>();
    @Output() save = new EventEmitter<DentalManagement>();

    editingPatient!: DentalManagement;

    ngOnInit() {
        this.editingPatient = new DentalManagement({ ...this.patient });
    }

    onSubmit() {
        this.save.emit(this.editingPatient);
    }
}
