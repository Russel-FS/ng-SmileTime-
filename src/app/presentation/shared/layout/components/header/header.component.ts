import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
})
export class HeaderComponent {
  @Output() navigate = new EventEmitter<string>();
  isMenuCollapsed = true;

  onNavigate(route: string): void {
    this.navigate.emit(route);
    console.log('Navigating to:', route);
  }

  showToggle(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
