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
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            specialization: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.registrationForm.valid) {
            const newDentist: Dentist = {
                ...this.registrationForm.value,
                active: true,
                role: 'dentist',
            };
            console.log('Nuevo dentista:', newDentist);
            this.registrationForm.reset();
        }
    }
}
