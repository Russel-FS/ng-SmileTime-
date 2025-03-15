import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { CiteEntity } from '../../core/domain/model/dashboard/cite-entity';
import { DataEntity } from '../../core/domain/model/dashboard/data-entity';
import { PacientEntity } from '../../core/domain/model/dashboard/pacient-entity';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService]
    });
    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get dashboard data', () => {
    const mockData = new DataEntity({
      totalPatients: 100,
      newPatients: 10,
      pendingAppointments: 20,
      completedTreatments: 30,
      monthlyAppointments: new Map([['January', 10]]),
      treatments: { cleanings: 10, extractions: 5, fillings: 15 }
    });

    service.getDashboardData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('api/dashboard/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should get appointments', () => {
    const mockAppointments = [
      new CiteEntity({
        paciente: 'John Doe',
        doctor: 'Dr. Smith',
        fecha: '2024-01-20',
        hora: '10:00',
        tratamiento: 'Cleaning'
      })
    ];

    service.getAppointments().subscribe(appointments => {
      expect(appointments).toEqual(mockAppointments);
    });

    const req = httpMock.expectOne('api/dashboard/appointments');
    expect(req.request.method).toBe('GET');
    req.flush(mockAppointments);
  });

  it('should get patients', () => {
    const mockPatients = [
      new PacientEntity({
        nombre: 'John Doe',
        tratamiento: 'Cleaning',
        citas: 3
      })
    ];

    service.getPatients().subscribe(patients => {
      expect(patients).toEqual(mockPatients);
    });

    const req = httpMock.expectOne('api/dashboard/patients');
    expect(req.request.method).toBe('GET');
    req.flush(mockPatients);
  });

  it('should create appointment', () => {
    const mockAppointment = new CiteEntity({
      paciente: 'John Doe',
      doctor: 'Dr. Smith',
      fecha: '2024-01-20',
      hora: '10:00',
      tratamiento: 'Cleaning'
    });

    service.createAppointment(mockAppointment).subscribe(appointment => {
      expect(appointment).toEqual(mockAppointment);
    });

    const req = httpMock.expectOne('api/dashboard/appointments');
    expect(req.request.method).toBe('POST');
    req.flush(mockAppointment);
  });

  it('should update appointment', () => {
    const mockAppointment = new CiteEntity({
      paciente: 'John Doe',
      doctor: 'Dr. Smith',
      fecha: '2024-01-20',
      hora: '10:00',
      tratamiento: 'Cleaning'
    });

    service.updateAppointment('123', mockAppointment).subscribe(appointment => {
      expect(appointment).toEqual(mockAppointment);
    });

    const req = httpMock.expectOne('api/dashboard/appointments/123');
    expect(req.request.method).toBe('PUT');
    req.flush(mockAppointment);
  });

  it('should delete appointment', () => {
    service.deleteAppointment('123').subscribe();

    const req = httpMock.expectOne('api/dashboard/appointments/123');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
