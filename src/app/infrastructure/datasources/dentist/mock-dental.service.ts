import { Injectable } from '@angular/core';
import { DentalManagement } from '../../../presentation/pages/dentist/model/dental-management.model';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MockDentalService {
    private patients: DentalManagement[] = [
        new DentalManagement({
            id: "P001",
            name: 'Russel',
            lastName: 'Pérez',
            phone: '1234567890',
            lastVisit: new Date(),
            status: 'active'
        }),

    ];

    getPatients(): Observable<DentalManagement[]> {
        return of(this.patients);
    }

    addPatient(patient: DentalManagement): Observable<DentalManagement> {
        const newPatient = new DentalManagement({
            ...patient,
            id: `P${this.patients.length + 1}`.padStart(4, '0'),
            lastVisit: new Date()
        });
        this.patients = [...this.patients, newPatient];
        return of(newPatient);
    }

    updatePatient(patient: DentalManagement): Observable<DentalManagement> {
        const index = this.patients.findIndex(p => p.id === patient.id);
        if (index !== -1) {
            this.patients[index] = patient;
            return of(patient);
        }
        throw new Error('Paciente no encontrado');
    }

    deletePatient(id: string | number): Observable<boolean> {
        const initialLength = this.patients.length;
        this.patients = this.patients.filter(p => p.id !== id);
        return of(this.patients.length !== initialLength);
    }

    getPatientById(id: string | number): Observable<DentalManagement | undefined> {
        return of(this.patients.find(p => p.id === id));
    }
}
