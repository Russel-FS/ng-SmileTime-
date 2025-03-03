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
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  providers: [
    MessageUseCase,
    MessageDataSource,
    MessageMapper,
    {
      provide: IMessageRepository,
      useClass: MessageRepository,
    },
  ],
})
export class LayoutComponent {
  constructor(private route: Router) {}

  handleNavigate(route: string): void {
    this.route.navigate([route]); 
  }
}
