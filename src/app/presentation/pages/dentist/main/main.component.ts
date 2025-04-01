import { Component } from '@angular/core';
import { ChatSidebarComponent } from "../../../components/chat/chat-sidebar/chat-sidebar.component";
import { CalendarComponent } from "../../client/appointments/calendar/calendar.component";

@Component({
  selector: 'app-main',
  imports: [ChatSidebarComponent, CalendarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
