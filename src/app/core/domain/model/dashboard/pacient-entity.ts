export class PacientEntity {
    public nombre: string;
    public tratamiento: string;
    public citas: number;
    public avatar?: string;

    constructor(params: {
        nombre: string;
        tratamiento: string;
        citas: number;
        avatar?: string;
    }) {
        this.nombre = params.nombre;
        this.tratamiento = params.tratamiento;
        this.citas = params.citas;
        this.avatar = params.avatar || '';
    }
}
