import { Component } from '@angular/core';
import { TypingComponent } from '../../../components/chat/typing/typing.component';
import { ManageTypingStatusUseCase } from '../../../../core/use-cases/signalR/manage-typing-status-use-case';
import { IRealTimeComunication } from '../../../../core/interfaces/signalR/i-real-time-comunication';
import { SignalRService } from '../../../../core/services/signal-r.service';

@Component({
  selector: 'app-register',
  imports: [],
  providers: [
    ManageTypingStatusUseCase,
    {
      provide: IRealTimeComunication,
      useClass: SignalRService
    }
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  typingTimeout: any;
  isTyping = false;

  constructor(private manageTyping: ManageTypingStatusUseCase) { }
  onUserTyping() {
    if (!this.isTyping) {
      this.isTyping = true;
      this.manageTyping.notifyTyping('2', true)
    }

    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(() => {
      this.isTyping = false;
      this.manageTyping.notifyTyping('2', false)
    }, 1000);

  }
}
