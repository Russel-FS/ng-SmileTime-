import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Asegura que FormsModule está importado

@Component({
  standalone: true, // Si es standalone, este debe estar presente
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [FormsModule] // ✅ Agregar FormsModule aquí si es standalone
})
export class ContactComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    countryCode: '',
    phone: '',
    language: ''
  };

  submitForm() {
    console.log('Form Data:', this.formData);
  }
}
