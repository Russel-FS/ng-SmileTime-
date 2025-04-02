import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
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
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
    ]
})
export class DentistListComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['name', 'email', 'specialization', 'licenseNumber', 'status', 'actions'];
    dataSource: MatTableDataSource<Dentist>;
    dentists: Dentist[] = [
        {
            id: 1,
            name: 'Dr. Juan Pérez',
            email: 'juan.perez@ejemplo.com',
            specialization: 'Ortodoncista',
            licenseNumber: 'LIC-001',
            active: true
        },
        {
            id: 2,
            name: 'Dra. María González',
            email: 'maria.gonzalez@ejemplo.com',
            specialization: 'Endodoncista',
            licenseNumber: 'LIC-002',
            active: true
        },
        {
            id: 3,
            name: 'Dr. Carlos Rodríguez',
            email: 'carlos.rodriguez@ejemplo.com',
            specialization: 'Cirujano Maxilofacial',
            licenseNumber: 'LIC-0034',
            active: false
        },
        {
            id: 4,
            name: 'flores. Ana Martínez',
            email: 'ana.martinez@ejemplo.com',
            specialization: 'Periodoncista',
            licenseNumber: 'LIC-0045',
            active: true
        },
        {
            id: 6,
            name: 'RR. Ana Martínez',
            email: 'ana.carlos@ejemplo.com',
            specialization: 'Periodoncista',
            licenseNumber: 'LIC-0047',
            active: true
        },
        {
            id: 7,
            name: 'RR. Ana Martínez',
            email: 'ana.solano@ejemplo.com',
            specialization: 'Periodoncista',
            licenseNumber: 'LIC-0048',
            active: true
        },
        {
            id: 8,
            name: 'RR. Ana Martínez',
            email: 'russel.flores@ejemplo.com',
            specialization: 'Periodoncista',
            licenseNumber: 'LIC-0049',
            active: true
        },
    ];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor() {
        this.dataSource = new MatTableDataSource<Dentist>();
    }

    ngOnInit() {
        this.dataSource.data = this.dentists;
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

    toggleStatus(dentist: Dentist) {
        dentist.active = !dentist.active;
    }
}
