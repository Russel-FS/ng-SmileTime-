import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // Importa HttpClientTestingModule para pruebas de HttpClient
    });
    service = TestBed.inject(ContactService); // Inyecta el servicio ContactService
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica si el servicio fue creado exitosamente
  });
});
