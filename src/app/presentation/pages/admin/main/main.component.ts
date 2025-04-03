import { Component } from '@angular/core';
import { ChatSidebarComponent } from "../../../components/chat/chat-sidebar/chat-sidebar.component";

@Component({
  selector: 'app-main',
  imports: [ChatSidebarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
