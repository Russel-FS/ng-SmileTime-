import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryComponent } from './recovery.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/infrastructure/datasources/auth/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryForm!: FormGroup;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.recoveryForm.invalid) {
      return;
    }

    this.loading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const email = this.recoveryForm.value.email;
    this.authService.recovery(email).subscribe(
      () => {
        this.successMessage = 'Se ha enviado un enlace de recuperación a tu correo electrónico.';
        this.loading = false;
      },
      (error: unknown) => { // Especificamos el tipo de error como "unknown"
        if (typeof error === 'object' && error !== null && 'message' in error) {
          this.errorMessage = (error as { message: string }).message;
        } else {
          this.errorMessage = 'Hubo un error al procesar tu solicitud. Inténtalo nuevamente.';
        }
        this.loading = false;
      }
    );
  }
}  