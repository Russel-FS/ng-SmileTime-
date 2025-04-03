import { Component } from '@angular/core';
import { Carrusel } from '../../../../core/domain/model/heropagedata/carrusel';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarouselService } from '../../../../infrastructure/datasources/carousel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-management',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './carousel-management.component.html',
  styleUrl: './carousel-management.component.css'
})
export class CarouselManagementComponent {
  carouselItems: Carrusel[] = [];
  carouselForm: FormGroup;
  formularioVisible = false;
  modoEdicion = false;
  itemSeleccionado: Carrusel | null = null;
  formularioEnviado = false;

  // Variables para el modal de confirmaciónes
  mostrarModalEliminar = false;
  itemParaEliminar: Carrusel | null = null;

  constructor(
    private carouselService: CarouselService,
    private fb: FormBuilder
  ) {
    this.carouselForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(500)]],
      alt: ['', [Validators.maxLength(255)]],
      imagenUrl: ['', [Validators.required, Validators.maxLength(255)]],
      activo: [true]
    });
  }

  ngOnInit(): void {
    this.obtenerCarouselItems();
  }

  obtenerCarouselItems(): void {
    this.carouselService.getCarouselItems().subscribe(
      {
        next: (items) => {
          this.carouselItems = items;
        },
        error: (error) => console.error('Error al obtener los carruseles', error)
      }
    );
  }

  mostrarFormularioNuevo(): void {
    this.formularioVisible = true;
    this.modoEdicion = false;
    this.formularioEnviado = false;
    this.carouselForm.reset({
      activo: true // Establecer el valor predeterminado para activo
    });
  }

  cancelarFormulario(): void {
    this.formularioVisible = false;
    this.formularioEnviado = false;
    this.carouselForm.reset();
  }

  guardarItem(): void {
    this.formularioEnviado = true;

    if (this.carouselForm.invalid) {
      return;
    }

    const nuevoItem: Carrusel = this.carouselForm.value;

    if (this.modoEdicion && this.itemSeleccionado) {
      this.carouselService.updateCarousel(this.itemSeleccionado.id, nuevoItem).subscribe(
        (updatedItem) => {
          const index = this.carouselItems.findIndex(item => item.id === updatedItem.id);
          this.carouselItems[index] = updatedItem;
          this.cancelarFormulario();
        },
        (error) => {
          console.error('Error al actualizar el carrusel', error);
        }
      );
    } else {
      this.carouselService.createCarousel(nuevoItem).subscribe(
        (createdItem) => {
          this.carouselItems.push(createdItem);
          this.cancelarFormulario();
        },
        (error) => {
          console.error('Error al crear el carrusel', error);
        }
      );
    }
  }

  editarItem(item: Carrusel): void {
    this.modoEdicion = true;
    this.itemSeleccionado = item;
    this.formularioEnviado = false;
    this.carouselForm.patchValue(item);
    this.formularioVisible = true;
  }

  confirmarEliminar(item: Carrusel): void {
    this.itemParaEliminar = item;
    this.mostrarModalEliminar = true;
  }

  cancelarEliminar(): void {
    this.mostrarModalEliminar = false;
    this.itemParaEliminar = null;
  }

  eliminarItem(): void {
    if (!this.itemParaEliminar) return;

    this.carouselService.deleteCarousel(this.itemParaEliminar.id).subscribe(
      () => {
        this.carouselItems = this.carouselItems.filter(i => i.id !== this.itemParaEliminar?.id);
        this.cancelarEliminar();
      },
      (error) => {
        console.error('Error al eliminar el carrusel', error);
      }
    );
  }

  // Getter para el acceso fácil a los campos del formulario en las validaciones del template
  get f() {
    return this.carouselForm.controls;
  }
}
