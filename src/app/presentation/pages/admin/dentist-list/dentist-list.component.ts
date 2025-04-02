import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Dentist } from '../models/dentist.interface';

@Component({
    selector: 'app-dentist-list',
    templateUrl: './dentist-list.component.html', 
    styleUrls: ['./dentist-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule
    ]
})
export class DentistListComponent {
    displayedColumns: string[] = ['name', 'email', 'specialization', 'licenseNumber', 'status', 'actions'];
    dentists: Dentist[] = []; // Aquí se cargarían los dentistas desde un servicio

    toggleStatus(dentist: Dentist) {
        dentist.active = !dentist.active;
        // Aquí iría la lógica para actualizar el estado en la base de datos
    }
}
