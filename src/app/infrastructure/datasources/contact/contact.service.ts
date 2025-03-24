import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:4200'; // URL de tu API en desarrollo

  constructor(private http: HttpClient) { }

  submitForm(formData: any): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
