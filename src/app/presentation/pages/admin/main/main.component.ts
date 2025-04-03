import { Component } from '@angular/core';
import { ChatSidebarComponent } from "../../../components/chat/chat-sidebar/chat-sidebar.component";
import { AdminSidebarComponent } from "../../../components/admin/admin-sidebar/admin-sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [AdminSidebarComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
