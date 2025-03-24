import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { IAuthRepository } from '../../../../core/interfaces/repositorys/auth/i-auth-repository';
import { AuthRepository } from '../../../../data/repositories/auth/auth.repository';
import { IAuthService } from '../../../../core/interfaces/datasource/auth/i-auth-service';
import { AuthService } from '../../../../infrastructure/datasources/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../core/services/notifications/notification.service';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './recovery.component.html',
  styleUrl: './recovery.component.css',
  providers: [
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
    {
      provide: IAuthService,
      useClass: AuthService,
    },
  ],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('500ms ease-in-out', style({ opacity: 0, transform: 'translateY(20px)' })),
      ]),
    ]),
  ],
})
export class RecoveryComponent {
  loading = false;
  recoveryForm: FormGroup;
  
  constructor(
    @Inject(IAuthRepository) private authService: IAuthRepository,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.recoveryForm.invalid) {
      this.markFormGroupTouched(this.recoveryForm);
      return;
    }

    this.loading = true;
    this.authService.recoverPassword(this.recoveryForm.value.email).subscribe({
      next: () => {
        this.notificationService.success('Se ha enviado un enlace de recuperación a su correo electrónico.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.loading = false;
        const errorMessage = error.error.messageResponse || 'Error al enviar el enlace de recuperación';
        this.notificationService.error(errorMessage);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(): string {
    const control = this.recoveryForm.get('email');
    if (control?.hasError('required')) {
      return 'El email es requerido';
    }
    if (control?.hasError('email')) {
      return 'Email no válido';
    }
    return '';
  }
}