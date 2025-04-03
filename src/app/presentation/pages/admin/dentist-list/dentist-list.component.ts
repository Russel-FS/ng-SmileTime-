import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Dentist } from '../models/dentist.interface';
import { DentistService } from '../../../../infrastructure/datasources/admin/dentist.service';

@Component({
    selector: 'app-dentist-list',
    templateUrl: './dentist-list.component.html',
    styleUrls: ['./dentist-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ]
})
export class DentistListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['name', 'email', 'specialization', 'status', 'actions'];
    dataSource: MatTableDataSource<Dentist>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private dentistService: DentistService) {
        this.dataSource = new MatTableDataSource<Dentist>();
    }

    ngOnInit() {
        this.loadDentists();
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    loadDentists() {
        this.dentistService.getAllDentists().subscribe(
            {
                next: (dentists: Dentist[]) => {
                    this.dataSource.data = dentists;
                }
                , error: (error) => {
                    console.error('Error al obtener dentistas:', error);

                }
            }
        );
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
