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
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        this.notificationService.success('Inicio de sesión exitoso, bienvenido');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.loading = false; // carga 
        this.notificationService.error('Error al iniciar sesión'); // mensaje de notificacion
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
}
