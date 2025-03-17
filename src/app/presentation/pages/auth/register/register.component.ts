import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { IAuthRepository } from '../../../../core/interfaces/repositorys/auth/i-auth-repository';
import { AuthRepository } from '../../../../data/repositories/auth/auth.repository';
import { IAuthService } from '../../../../core/interfaces/datasource/auth/i-auth-service';
import { AuthService } from '../../../../infrastructure/datasources/auth/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../core/services/notifications/notification.service';

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
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('500ms ease-in-out', style({ opacity: 0, transform: 'translateY(20px)' })),
      ])
    ]),
  ],
})
export class RegisterComponent implements OnInit {
  loading = false;
  registerForm!: FormGroup;

  constructor(
    @Inject(IAuthRepository) private AuthService: IAuthRepository,
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) { }
  ngOnInit() {
    console.log('Inicializando registerForm...');

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).*$/)
        ]
      }],
      confirmPassword: ['', {
        validators: [Validators.required]
      }]
    }, {
      validators: (formGroup: AbstractControl): ValidationErrors | null => {
        return this.passwordsMatchValidator(formGroup);
      }
    });
  }

  /**
   *  valida que las contraseñas coincidan 
   * @param formGroup - el FormGroup que contiene los campos 'password' y 'confirmPassword'
   * @returns un objeto ValidationErrors si las contraseñas no coinciden, null en caso contrario 
   */
  passwordsMatchValidator(formGroup: AbstractControl) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    return null;
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

  /**
   * marca los controles del formulario como tocados 
   * @param formGroup - el FormGroup que contiene los controles que se van a marcar como tocados
   */
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * devuelve un mensaje de error basado en el controlName.
   * 
   * @param controlName - el control que se va a validar.
   * @returns mensaje de error basado en el controlName
   *            'Este campo es requerido'
   *            'Email no válido'
   *            'Debe tener al menos 6 caracteres' y otras validaciones
   */
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
    if (control?.hasError('mismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
}