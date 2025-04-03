import { Component } from '@angular/core';
import { AdminSidebarComponent } from "../../../components/admin/admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-admin-home',
  imports: [AdminSidebarComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
