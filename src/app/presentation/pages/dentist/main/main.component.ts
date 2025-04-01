import { Component } from '@angular/core';
import { ChatSidebarComponent } from "../../../components/chat/chat-sidebar/chat-sidebar.component";
import { CalendarComponent } from "../../client/appointments/calendar/calendar.component";
import { DentistSidebarComponent } from "../../../components/dentist/dentist-sidebar/dentist-sidebar.component";

@Component({
  selector: 'app-main',
  imports: [ChatSidebarComponent, CalendarComponent, DentistSidebarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
