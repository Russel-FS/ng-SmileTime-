import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalRService } from './core/services/signal-r.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-SmileTime';
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private SignalRService: SignalRService,
  ) {
    this.form = this.fb.group({
      user: [''],
      message: [''],
    });
  }

  sendMessage() {
    const user = this.form.get('user')?.value;
    const message = this.form.get('message')?.value;
    this.SignalRService.sendMessage(user, message);
    this.form.reset();
  }
}
