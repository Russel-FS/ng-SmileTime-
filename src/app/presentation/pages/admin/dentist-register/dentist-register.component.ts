import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dentist } from '../models/dentist.interface';
import { DentistService } from '../../../../infrastructure/datasources/admin/dentist.service';

@Component({
    selector: 'app-dentist-register',
    templateUrl: './dentist-register.component.html',
    styleUrls: ['./dentist-register.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class DentistRegisterComponent {
    registrationForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private dentistService: DentistService
    ) {
        this.registrationForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            specialization: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.registrationForm.valid) {
            this.dentistService.addDentist(this.registrationForm.value as Dentist).subscribe({
                next: (response) => {
                    console.log('Odontólogo registrado:', response);
                },
                error: (error) => {
                    console.error('Error al registrar el odontólogo:', error);
                }
            });
        }
    }
}
