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

    constructor(params: {
        id: number | string;
        name: string;
        lastName: string;
        phone: string;
        status: PatientStatus;
        lastVisit?: Date;
        appointments?: DentalAppointment[];
    }) {
        this.id = params.id;
        this.name = params.name;
        this.lastName = params.lastName;
        this.phone = params.phone;
        this.status = params.status;
        this.lastVisit = params.lastVisit;
        this.appointments = params.appointments || [];
    }

    get fullName(): string {
        return `${this.name} ${this.lastName}`;
    }
}
