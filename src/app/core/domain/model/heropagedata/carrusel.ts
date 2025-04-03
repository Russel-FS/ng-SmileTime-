export class Carrusel {
  constructor(
    public id: number,
    public imagenUrl: string,
    public titulo: string,
    public descripcion: string,
    public alt: string,
    public activo: boolean = true
  ) { }
}
