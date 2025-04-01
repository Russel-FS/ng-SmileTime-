import { Component } from '@angular/core';
import { DentistSidebarComponent } from "../../../components/dentist/dentist-sidebar/dentist-sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [DentistSidebarComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
