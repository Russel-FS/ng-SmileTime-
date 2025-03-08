import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchChange = new EventEmitter<any>();

  searchTerm: string = '';
  showFilters: boolean = false;
  selectedSpecialty: string = '';
  selectedLocation: string = '';
  selectedAvailability: string = '';

  constructor() { }

  ngOnInit(): void { }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onSearch(): void {
    const searchData = {
      term: this.searchTerm,
      filters: {
        specialty: this.selectedSpecialty,
        location: this.selectedLocation,
        availability: this.selectedAvailability
      }
    };
    this.searchChange.emit(searchData);
  }

  hasActiveFilters(): boolean {
    return this.selectedSpecialty !== '' || 
           this.selectedLocation !== '' || 
           this.selectedAvailability !== '';
  }

  get activeFilters(): string[] {
    const filters: string[] = [];
    if (this.selectedSpecialty) filters.push(this.selectedSpecialty);
    if (this.selectedLocation) filters.push(this.selectedLocation);
    if (this.selectedAvailability) filters.push(this.selectedAvailability);
    return filters;
  }

  removeFilter(filter: string): void {
    if (this.selectedSpecialty === filter) {
      this.selectedSpecialty = '';
    }
    if (this.selectedLocation === filter) {
      this.selectedLocation = '';
    }
    if (this.selectedAvailability === filter) {
      this.selectedAvailability = '';
    }
    this.onSearch();
  }
}
