import { Component } from '@angular/core';
import { CalendarComponent } from "../../client/appointments/calendar/calendar.component";
import { DentistSidebarComponent } from "../../../components/dentist/dentist-sidebar/dentist-sidebar.component";

@Component({
  selector: 'app-main',
  imports: [CalendarComponent, DentistSidebarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
