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
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            fullName: ['', Validators.required],
            role: ['Dentist', Validators.required],
            specialization: ['', Validators.required],
            active: [true, Validators.required]
        });
    }

    onSubmit() {
        if (this.registrationForm.valid) {
            const dentistData = {
                ...this.registrationForm.value,
                role: 'Dentist',
                active: true
            };

            this.dentistService.addDentist(dentistData).subscribe({
                next: () => {
                    console.log('Odontólogo registrado con éxito');
                    this.registrationForm.reset();
                },
                error: (error) => {
                    console.error('Error al registrar odontólogo:', error);
                }
            });
        }
    }
}
