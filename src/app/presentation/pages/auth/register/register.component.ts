import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { IAuthRepository } from '../../../../core/interfaces/repositorys/auth/i-auth-repository';
import { AuthRepository } from '../../../../data/repositories/auth.repository';
import { IAuthService } from '../../../../core/interfaces/datasource/auth/i-auth-service';
import { AuthService } from '../../../../infrastructure/datasources/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
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
export class RegisterComponent implements OnInit{
  loading = false;
  registerForm!: FormGroup;

  constructor(
    @Inject(IAuthRepository) private AuthService: IAuthRepository,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    console.log('Inicializando registerForm...');

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
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
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordsMatchValidator });
    console.log('registerForm inicializado:', this.registerForm);
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    console.log('Formulario válido:', this.registerForm.valid);
  console.log('Valores del formulario:', this.registerForm.value);

    if (this.registerForm.invalid) {
      this.markFormGroupTouched(this.registerForm);
      return;
    }
    
    this.loading = true;
    this.AuthService.register(this.registerForm.value).subscribe({
      next: () => {
        this.notificationService.success('Registro exitoso, ahora puedes iniciar sesión');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.notificationService.error('Error al registrar usuario');
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

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Email no válido';
    }
    if (control?.hasError('minlength')) {
      return 'Debe tener al menos 6 caracteres';
    }
    if (control?.hasError('pattern')) {
      return 'Debe contener mayúsculas y minúsculas';
    }
    if (controlName === 'confirmPassword' && control?.hasError('mismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}