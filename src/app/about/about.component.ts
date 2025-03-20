import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  teamMembers = [
    { name: 'Russel Flores', role: 'Layout y Componentes Base', image: 'assets/images/' },
    { name: 'James Velezmoro', role: 'Landing Page', image: 'assets/images/' },
    { name: 'Gabriel Angeles', role: 'About Us', image: 'assets/images/' },
    { name: 'Randhy Malca', role: 'Contact View', image: 'assets/images/' },
    { name: 'Antony Campos', role: 'Login & Register UI', image: 'assets/images/' },
    { name: 'Sahel Palacios', role: 'Dashboard Template', image: 'assets/images/' }
  ];

  timelineEvents = [
    { year: '2022', event: 'Inicio del proyecto SmileTime' },
    { year: '2023', event: 'Lanzamiento de la primera versión' },
    { year: '2024', event: 'Expansión del equipo y nuevas funcionalidades' }
  ];
}
