import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DentistRegisterComponent } from "../dentist-register/dentist-register.component";
import { DentistListComponent } from "../dentist-list/dentist-list.component";

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        DentistRegisterComponent,
        DentistListComponent
    ]
})
export class AdminPanelComponent {
    constructor() { }
}
