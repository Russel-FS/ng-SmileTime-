import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Carrusel } from '../../core/domain/model/heropagedata/carrusel';
import { ApiConfig } from '../config/app.config';
import { StorageService } from '../../core/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  constructor(
    private http: HttpClient,
    private apiUrl: ApiConfig,
    private storage: StorageService
  ) { }

  // ✅ Listar Items activos (No requiere autenticación)
  getCarouselItems(): Observable<Carrusel[]> {
    const url = this.apiUrl.getEndpoint('carousel', 'active');
    return this.http.get<Carrusel[]>(url).pipe(
      tap(data => console.log('✅ Carruseles activos:', data)),
      catchError(this.handleError)
    );
  }

  // 🆕 Crear carrusel (Requiere autenticación)
  createCarousel(carrusel: Carrusel): Observable<Carrusel> {
    const url = this.apiUrl.getEndpoint('carousel', 'create');
    const headers = this.storage.getAuthHeaders();
    return this.http.post<Carrusel>(url, carrusel, { headers }).pipe(
      tap(data => console.log('🆕 Carrusel creado:', data)),
      catchError(this.handleError)
    );
  }

  // ✏️ Modificar carrusel (Requiere autenticación)
  updateCarousel(id: number, carrusel: Carrusel): Observable<Carrusel> {
    const url = `${this.apiUrl.getEndpoint('carousel', 'update')}/${id}`;
    const headers = this.storage.getAuthHeaders();
    return this.http.put<Carrusel>(url, carrusel, { headers }).pipe(
      tap(data => console.log('✏️ Carrusel actualizado:', data)),
      catchError(this.handleError)
    );
  }


  // ❌ Eliminar carrusel (Requiere autenticación)
  deleteCarousel(id: number): Observable<void> {
    const url = `${this.apiUrl.getEndpoint('carousel', 'delete')}/${id}`;
    const headers = this.storage.getAuthHeaders();
    return this.http.delete<void>(url, { headers }).pipe(
      tap(() => console.log(`❌ Carrusel eliminado: ${id}`)),
      catchError(this.handleError)
    );
  }


  // ⚠️ Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('❌ Error:', error);
    return throwError(() => new Error(error.message));
  }
}
