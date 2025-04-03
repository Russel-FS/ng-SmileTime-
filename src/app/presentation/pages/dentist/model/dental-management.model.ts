export type AppointmentType = 'limpieza' | 'consulta' | 'tratamiento';
export type AppointmentStatus = 'pendiente' | 'confirmada' | 'cancelada';
export type PatientStatus = 'active' | 'pending' | 'inactive';

export interface DentalAppointment {
    id: number | string;
    patientId?: number | string;
    dentistId?: number | string;
    date: Date;
    time: string;
    type: AppointmentType;
    status: AppointmentStatus;
    duration: number;
    notes?: string;
}


export class DentalManagement {
    id: number | string;
    name: string;
    lastName: string;
    phone: string;
    status: PatientStatus;
    lastVisit?: Date;
    appointments: DentalAppointment[];
    email?: string;
    allergies?: string;
    medicalNotes?: string;

    constructor(params: {
        id: number | string;
        name: string;
        lastName: string;
        phone: string;
        status: PatientStatus;
        lastVisit?: Date;
        appointments?: DentalAppointment[];
        email?: string;
        allergies?: string;
        medicalNotes?: string;
    }) {
        this.id = params.id;
        this.name = params.name;
        this.lastName = params.lastName;
        this.phone = params.phone;
        this.status = params.status;
        this.lastVisit = params.lastVisit;
        this.appointments = params.appointments || [];
        this.email = params.email;
        this.allergies = params.allergies;
        this.medicalNotes = params.medicalNotes;
    }

    get fullName(): string {
        return `${this.name} ${this.lastName}`;
    }
}


export interface AppointmentRequest {
    appointment: {
        dentistId?: string;
        patientId?: string;
        date: string;
        time: string;
        type: AppointmentType;
        duration: number;
        notes?: string;
    };
    patientInfo: {
        name: string;
        phone: string;
        status: PatientStatus;
    };
}


export interface AppointmentResponse {
    appointment: {
        patientId: string;
        date: string;
        time: string;
        type: AppointmentType;
        duration: number;
        notes?: string;
        status: AppointmentStatus;
    };
    patientInfo: {
        name: string;
        phone: string;
        status: PatientStatus;
    };
}