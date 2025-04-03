import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Dentist } from '../../../presentation/pages/admin/models/dentist.interface';


@Injectable({
    providedIn: 'root'
})
export class DentistService {


    constructor(private http: HttpClient) { }

    getAllDentists(): Observable<Dentist[]> {
        // Temporalmente retornamos datos mock
        // TODO: Reemplazar con llamada HTTP real cuando esté lista la API
        return of([
            {
                id: 1,
                fullName: 'Dr. Flores Pérez',
                email: 'flores.perez@ejemplo.com',
                specialization: 'Ortodoncista',
                active: true,
                role: 'dentist'
            },
            {
                id: 2,
                fullName: 'Dra. María González',
                email: 'maria.gonzalez@ejemplo.com',
                specialization: 'Endodoncista',
                active: true,
                role: 'dentist'
            },

        ]);

        // Cuando la API esté lista, usar:
        // return this.http.get<Dentist[]>(this.apiUrl);
    }

    toggleDentistStatus(dentistId: number, active: boolean): Observable<any> {
        return of({ success: true });
        // return this.http.patch(`${this.apiUrl}/${dentistId}/status`, { active });
    }
}
