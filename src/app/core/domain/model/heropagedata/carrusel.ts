export class Carrusel {
  constructor(
    public id: number,
    public imageUrl: string,
    public title: string,
    public description: string,
    public alt: string,
    public active: boolean = false
  ) { }
}
