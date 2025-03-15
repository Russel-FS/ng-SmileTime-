export class Datadashboard {
    public paciente: string;
    public doctor: string;
    public fecha: string;
    public hora: string;
    public tratamiento: string;
    public acciones: string;

    constructor(params: {
        paciente: string;
        doctor: string;
        fecha: string;
        hora: string;
        tratamiento: string;
        acciones?: string;
    }) {
        this.paciente = params.paciente;
        this.doctor = params.doctor;
        this.fecha = params.fecha;
        this.hora = params.hora;
        this.tratamiento = params.tratamiento;
        this.acciones = params.acciones || '';
    }
}
