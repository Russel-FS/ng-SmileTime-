import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map } from 'rxjs/operators';
import { Pacient } from '../../../presentation/pages/dentist/model/pacient';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../config/app.config';
import { StorageService } from '../../../core/services/storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private searchTerms = new Subject<string>();

    constructor(
        private http: HttpClient,
        private apiConfig: ApiConfig,
        private storageService: StorageService,
    ) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    getPatients(): Observable<Pacient[]> {
        return this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => {
                if (!term.trim()) {
                    return of([]);
                }
                const searchUrl = `${this.apiConfig.getEndpoint('pacient', 'search')}/${term}`;

                return this.http.get<any>(searchUrl).pipe(
                    map(response => response.data as Pacient[]),
                    catchError(error => {
                        console.error('Error al buscar pacientes:', error);
                        return of([]);
                    })
                );
            })
        );
    }

    getPatientById(id: number): Observable<Pacient | undefined> {
        const url = this.apiConfig.getEndpoint('pacient', 'getById');
        return this.http.get<any>(url).pipe(
            map(response => response.data as Pacient),
            catchError(error => {
                console.error(`Error al obtener paciente ${id}:`, error);
                return of(undefined);
            })
        );
    }
}
