import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators'; // Añade map aquí
import { Carrusel } from '../../core/domain/model/heropagedata/carrusel';
import { ApiConfig } from '../config/app.config';
import { StorageService } from '../../core/services/storage/storage.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig,
    //private storage: StorageService
  ) { }

  getCarouselItems(): Observable<Carrusel[]> {
    const url = this.apiConfig.getEndpoint('carousel', 'active');
    //const headers = this.storage.getAuthHeaders();
    return this.http.get<Carrusel[]>(url).pipe(
      tap({
        next: (data) => console.log('Carousel data:', data),
        error: (error) => console.error('Error fetching carousel:', error)
      }),
      catchError(error => {
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          url: error.url
        });
        return throwError(() => error);
      })
    );
  }
}
