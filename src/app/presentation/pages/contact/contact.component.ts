import { Component } from '@angular/core';
import { ContactService } from '../../../infrastructure/datasources/contact/contact.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dentalProblem: '',
    date: ''
  };

  showModal = false;
  

  constructor(private contactService: ContactService) { }

  submitForm() {
    this.contactService.submitForm(this.formData).subscribe(
      response => {
        this.showModal = true; // Muestra el modal de éxito
      },
      error => {
        console.error('Error submitting form:', error);
      }
    );
  }

  closeModal() {
    this.showModal = false;
  }
}
