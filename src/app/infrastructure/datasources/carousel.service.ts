import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Carrusel } from '../../core/domain/model/heropagedata/carrusel';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  private mockData: Carrusel[] = [
    new Carrusel(1, 'https://clinicabarreiro.es/wp-content/uploads/2016/11/profilaxis-dental.jpg', 'Limpieza dental profesional', 'Eliminación de placa y sarro para una boca sana y fresca.', 'Profilaxis'),
    new Carrusel(2, 'https://centrovillanueva.com/wp-content/uploads/2018/07/mitos-verdades-blanqueamiento-dental-01.jpg', 'Blanqueamiento dental avanzado', 'Sonrisa más blanca en pocas sesiones.', 'Blanqueamiento Dental'),
    new Carrusel(3, 'https://soluciondental.pe/wp-content/uploads/2019/03/Bracketws-met%C3%A1licos-ortodoncia.jpg', 'Ortodoncia a medida', 'Brackets o alineadores para una sonrisa alineada', 'Brackets'),
    new Carrusel(4, 'https://gacetadental.com/wp-content/uploads/2022/07/implantes-prodent-italia.jpg', 'Implantes dentales de alta calidad', 'Reemplazo definitivo para dientes perdidos.', 'dientes perdidos'),
    new Carrusel(5, 'https://www.b-dent.cl/wp-content/uploads/2018/05/endodoncia.png', 'Endodoncia sin dolor', 'Salvamos tu diente y eliminamos la infección.', 'Endodoncia')
  ];

  getCarouselItems(): Observable<Carrusel[]> {
    // Simula una llamada HTTP
    return of(this.mockData);
  }

}
