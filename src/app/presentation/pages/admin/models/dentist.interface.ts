export interface Dentist {
    id: number;
    fullName: string;
    email: string;
    password?: string;
    specialization: string;
    active?: boolean;
    role: string;
}
