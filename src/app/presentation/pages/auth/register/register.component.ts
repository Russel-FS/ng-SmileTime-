import { Component } from '@angular/core';
import { TypingComponent } from '../../../components/chat/typing/typing.component';

@Component({
  selector: 'app-register',
  imports: [TypingComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
