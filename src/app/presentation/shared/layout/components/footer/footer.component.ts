import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  @Output() navigate = new EventEmitter<string>();
  onNavigate(route: string) {
    this.navigate.emit(route);
  }
}
