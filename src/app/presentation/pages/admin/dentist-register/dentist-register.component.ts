import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dentist } from '../models/dentist.interface';

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

    constructor(private fb: FormBuilder) {
        this.registrationForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            specialization: ['', Validators.required],
            licenseNumber: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.registrationForm.valid) {
            const newDentist: Dentist = {
                ...this.registrationForm.value,
                active: true
            };
            console.log('Nuevo dentista:', newDentist);
            this.registrationForm.reset();
        }
    }
}
