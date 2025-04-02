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
    styleUrls: ['./dentist-list.component.scss'],
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
            name: 'Dr. flores Pérez',
            email: 'juan.perez@ejemplo.com',
            specialization: 'Ortodoncista',
            active: true,
            role: 'dentist'
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
