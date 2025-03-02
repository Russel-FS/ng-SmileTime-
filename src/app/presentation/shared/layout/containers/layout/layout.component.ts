import { Component } from '@angular/core';
import { MessageUseCase } from '../../../../../core/use-cases/message.use-case';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageRepository } from '../../../../../data/repositories/message.repository';
import { MessageDataSource } from '../../../../../data/datasources/message.datasource';
import { MessageMapper } from '../../../../../data/mappers/message-mapper';
import { IMessageRepository } from '../../../../../core/interfaces/message.repository'; 

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  providers: [  
    MessageUseCase,
    MessageDataSource,
    MessageMapper, 
    { 
      provide: IMessageRepository,
      useClass: MessageRepository
    }
  ],
})
export class LayoutComponent {
  public form: FormGroup;

  constructor(private messageUseCase: MessageUseCase, fb: FormBuilder) {
    this.form = fb.group({
      time: [''],
      message: [''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.messageUseCase.createMessage(this.form.value).subscribe();
    }
  }
}
