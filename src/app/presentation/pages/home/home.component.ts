import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    
  ]
})
export class HomeComponent {
  constructor(private router: Router) {}

  searchDentist(searchTerm: string) {
    console.log('Búsqueda:', searchTerm);
    // Implementa aquí la lógica de búsqueda
    this.router.navigate(['/find-dentist'], {
      queryParams: { search: searchTerm }
    });
  }

  onNavigate(path: string) {
    this.router.navigate([path]);
  }
}
