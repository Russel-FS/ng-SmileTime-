import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CiteEntity } from '../../../core/domain/model/dashboard/cite-entity';
import { DataEntity } from '../../../core/domain/model/dashboard/data-entity';
import { PacientEntity } from '../../../core/domain/model/dashboard/pacient-entity';

@Injectable({
    providedIn: 'root'
})
export class MockDashboardService {
    private mockAppointments: CiteEntity[] = [
        new CiteEntity({
            paciente: 'Juan Pérez',
            doctor: 'Dr. García',
            fecha: '2024-01-20',
            hora: '09:00',
            tratamiento: 'Limpieza Dental'
        }),
        new CiteEntity({
            paciente: 'María López',
            doctor: 'Dra. Rodríguez',
            fecha: '2024-01-20',
            hora: '10:30',
            tratamiento: 'Extracción'
        }),
        new CiteEntity({
            paciente: 'Carlos Ruiz',
            doctor: 'Dr. García',
            fecha: '2024-01-21',
            hora: '11:00',
            tratamiento: 'Empaste'
        })
    ];

    private mockPatients: PacientEntity[] = [
        new PacientEntity({
            nombre: 'Juan Pérez',
            tratamiento: 'Limpieza Dental',
            citas: 3,
            avatar: 'icons/Paciente.svg'
        }),
        new PacientEntity({
            nombre: 'María López',
            tratamiento: 'Extracción',
            citas: 1,
            avatar: 'icons/Paciente.svg'
        }),
        new PacientEntity({
            nombre: 'Carlos Ruiz',
            tratamiento: 'Empaste',
            citas: 2,
            avatar: 'icons/Paciente.svg'
        })
    ];

    private mockDashboardData: DataEntity = new DataEntity({
        totalPatients: 150,
        newPatients: 12,
        pendingAppointments: 25,
        completedTreatments: 45,
        monthlyAppointments: new Map([
            ['Enero', 30],
            ['Febrero', 25],
            ['Marzo', 35],
            ['Abril', 28],
            ['Mayo', 32],
            ['Junio', 40]
        ]),
        treatments: {
            cleanings: 20,
            extractions: 15,
            fillings: 25
        },
        metrics: {
            totalPatientsChange: 10,
            newPatientsChange: 5,
            pendingAppointmentsChange: -2,
            completedTreatmentsChange: 8
        }
    });

    getDashboardData(): Observable<DataEntity> {
        return of(this.mockDashboardData);
    }

    getAppointments(): Observable<CiteEntity[]> {
        return of(this.mockAppointments);
    }

    getPatients(): Observable<PacientEntity[]> {
        return of(this.mockPatients);
    }
    getTreatmentStats(): Observable<{
        cleanings: number;
        extractions: number;
        fillings: number;
    }> {
        if (!this.mockDashboardData || !this.mockDashboardData.treatments) {
            return of({ cleanings: 0, extractions: 0, fillings: 0 });
        }
        return of(this.mockDashboardData.treatments);
    }

    getMonthlyAppointments(): Observable<Map<string, number>> {
        if (!this.mockDashboardData || !this.mockDashboardData.monthlyAppointments) {
            return of(new Map<string, number>());
        }
        return of(this.mockDashboardData.monthlyAppointments);
    }

    getMetrics(): Observable<{
        totalPatientsChange: number;
        newPatientsChange: number;
        pendingAppointmentsChange: number;
        completedTreatmentsChange: number;
    }> {
        return of({
            totalPatientsChange: this.mockDashboardData?.metrics?.totalPatientsChange || 0,
            newPatientsChange: this.mockDashboardData?.metrics?.newPatientsChange || 0,
            pendingAppointmentsChange: this.mockDashboardData?.metrics?.pendingAppointmentsChange || 0,
            completedTreatmentsChange: this.mockDashboardData?.metrics?.completedTreatmentsChange || 0
        });
    }

    createAppointment(appointment: CiteEntity): Observable<CiteEntity> {
        this.mockAppointments.push(appointment);
        return of(appointment);
    }

    updateAppointment(id: string, appointment: CiteEntity): Observable<CiteEntity> {
        return of(appointment);
    }

    deleteAppointment(id: string): Observable<void> {
        return of(void 0);
    }
}