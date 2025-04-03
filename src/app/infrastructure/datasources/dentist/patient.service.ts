import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Pacient } from '../../../presentation/pages/dentist/model/pacient';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private searchTerms = new Subject<string>();

    constructor() { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    private mockPatients: Pacient[] = [
        { id: 1, fullName: 'Juan Pérez', email: 'juan@example.com', specialization: 'General' },
        { id: 2, fullName: 'María García', email: 'maria@example.com', specialization: 'General' }
    ];

    getPatients(): Observable<Pacient[]> {
        return this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => {
                if (!term.trim()) {
                    return of([]);
                }
                return of(this.mockPatients.filter(patient =>
                    patient.fullName?.toLowerCase().includes(term.toLowerCase())
                ));
            })
        );
    }

    getPatientById(id: number): Observable<Pacient | undefined> {
        return of(this.mockPatients.find(patient => patient.id === id));
    }
}
