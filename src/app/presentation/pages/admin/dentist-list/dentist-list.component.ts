import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dentist } from '../models/dentist.interface';
import { DentistService } from '../../../../infrastructure/datasources/admin/dentist.service';

@Component({
    selector: 'app-dentist-list',
    templateUrl: './dentist-list.component.html',
    styleUrls: ['./dentist-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class DentistListComponent implements OnInit {
    dentists: Dentist[] = [];
    filteredDentists: Dentist[] = [];

    constructor(private dentistService: DentistService) { }

    ngOnInit() {
        this.loadDentists();
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
        this.filteredDentists = this.dentists.filter(dentist =>
            dentist.name?.toLowerCase().includes(filterValue) ||
            dentist.email.toLowerCase().includes(filterValue) ||
            dentist.specialization.toLowerCase().includes(filterValue)
        );
    }

    loadDentists() {
        this.dentistService.getAllDentists().subscribe({
            next: (dentists: Dentist[]) => {
                this.dentists = dentists;
                this.filteredDentists = dentists;
            },
            error: (error) => {
                console.error('Error al obtener dentistas:', error);
            }
        });
    }

    toggleStatus(dentist: Dentist) {
        this.dentistService.toggleDentistStatus(dentist.id, !dentist.active)
            .subscribe(
                {
                    next: (response) => {
                        dentist.active = !dentist.active;
                        console.log('Estado del dentista actualizado:', response);
                    },
                    error: (error) => {
                        console.error('Error al actualizar el estado del dentista:', error);
                    }
                }
            );
    }
}
