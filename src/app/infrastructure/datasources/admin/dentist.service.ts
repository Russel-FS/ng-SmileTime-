import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Dentist } from '../../../presentation/pages/admin/models/dentist.interface';
import { ApiConfig } from '../../config/app.config';
import { StorageService } from '../../../core/services/storage/storage.service';


@Injectable({
    providedIn: 'root'
})
export class DentistService {


    constructor(
        private http: HttpClient,
        private apiUrl: ApiConfig,
        private localStorage: StorageService
    ) { }

    getAllDentists(): Observable<Dentist[]> {
        const header = this.localStorage.getAuthHeaders();
        return this.http.get<Dentist[]>(this.apiUrl.getEndpoint('dentist', 'all'), { headers: header });
    }

    toggleDentistStatus(dentistId: number, status: boolean): Observable<Dentist> {
        const url = `${this.apiUrl.getEndpoint('dentist', 'all')}/${dentistId}/status`;
        return this.http.put<Dentist>(url, { status });
    }


    addDentist(dentist: Dentist): Observable<any> {
        const url = this.apiUrl.getEndpoint('dentist', 'create');
        const header = this.localStorage.getAuthHeaders();
        return this.http.post<Dentist>(url, dentist, { headers: header });
    }

}