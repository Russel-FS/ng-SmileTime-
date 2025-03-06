import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { IAuthRepository } from '../../../../core/interfaces/i-auth-repository';
import { AuthRepository } from '../../../../data/repositories/auth.repository';
import { IAuthService } from '../../../../core/interfaces/i-auth-service';
import { AuthService } from '../../../../infrastructure/datasources/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
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
  loginForm: FormGroup;
  constructor(
    private AuthService: IAuthRepository,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit() {
    this.AuthService.login(this.loginForm.value);
  }
}
