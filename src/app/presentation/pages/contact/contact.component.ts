
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Asegura que FormsModule está importado
import { CommonModule } from '@angular/common';
@Component({
  standalone: true, // Si es standalone, este debe estar presente
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [FormsModule, CommonModule] // ✅ Agregar FormsModule aquí si es standalone
})
export class ContactComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    countryCode: '',
    phone: '',
    language: '',
    dentalProblem:'',
    date:''
  };
 
  


  showModal = false;
  submitForm() {
    console.log('Form Data:', this.formData);
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false; // Cierra el modal cuando se hace clic en el botón
  }
}
