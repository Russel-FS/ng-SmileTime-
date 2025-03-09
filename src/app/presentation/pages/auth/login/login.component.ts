import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { IAuthRepository } from '../../../../core/interfaces/i-auth-repository';
import { AuthRepository } from '../../../../data/repositories/auth.repository';
import { IAuthService } from '../../../../core/interfaces/i-auth-service';
import { AuthService } from '../../../../infrastructure/datasources/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../core/services/notification.service';
import { StorageService } from '../../../../core/services/storage.service';
import { SignalRService } from '../../../../core/services/signal-r.service';
import { AuthResponse } from '../../../../core/domain/models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
    ]),
  ],
})
export class LoginComponent {
  loading = false;
  loginForm: FormGroup;
  constructor(
    @Inject(IAuthRepository) private AuthService: IAuthRepository,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private storageService: StorageService,
    private signalR: SignalRService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).*$/),
        ],
      ],
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.loading = true;
    this.AuthService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.success(response);
      },
      error: (error) => {
        this.error(error);
      },
      complete: () => {
        this.complete();
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

  success(response: AuthResponse) {
    console.log(response);
    this.storageService.setAuthData(response);
    this.notificationService.success('Inicio de sesión exitoso, bienvenido');
    this.signalR.connect();
    this.router.navigate(['/home']);
  }
  error(eror: any) {
    this.loading = false; // carga
    this.notificationService.error('Error al iniciar sesión'); // mensaje de notificacion
  }

  complete() {
    this.loading = false;
  }
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Email no válido';
    }
    if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (control?.hasError('pattern')) {
      return 'La contraseña debe contener mayúsculas y minúsculas';
    }
    return '';
  }
}
