import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  @ViewChild('carouselInner') carouselInner!: ElementRef;

  carouselItems = [
    {
      imageUrl: 'assets/images/service1.jpg',
      title: 'Limpieza Dental',
      description: 'Servicio profesional de limpieza dental',
      alt: 'Limpieza Dental',
    },
    {
      imageUrl: 'assets/images/service2.jpg',
      title: 'Ortodoncia',
      description: 'Tratamientos de ortodoncia personalizados',
      alt: 'Ortodoncia',
    },
    {
      imageUrl: 'assets/images/service3.jpg',
      title: 'Blanqueamiento',
      description: 'Blanqueamiento dental profesional',
      alt: 'Blanqueamiento',
    },
  ];

  currentIndex = 0;
  autoPlayInterval: any;
  isAutoPlaying = true;

  constructor(
    private router: Router,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.startAutoPlay();
  }

  startAutoPlay() {
    this.ngZone.runOutsideAngular(() => {
      this.autoPlayInterval = setInterval(() => {
        this.ngZone.run(() => {
          this.nextSlide();
        });
      }, 5000);
    });
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  onCarouselMouseEnter() {
    this.stopAutoPlay();
  }

  onCarouselMouseLeave() {
    if (this.isAutoPlaying) {
      this.startAutoPlay();
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselItems.length;
    this.updateCarouselPosition();
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
    this.updateCarouselPosition();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.updateCarouselPosition();
  }

  private updateCarouselPosition() {
    const offset = this.currentIndex * -100;
    if (this.carouselInner?.nativeElement) {
      this.carouselInner.nativeElement.style.transform = `translateX(${offset}%)`;
    }
  }

  searchDentist(searchTerm: string) {
    console.log('Búsqueda:', searchTerm);
    // Implementa aquí la lógica de búsqueda
    this.router.navigate(['/find-dentist'], {
      queryParams: { search: searchTerm },
    });
  }

  onNavigate(path: string) {
    this.router.navigate([path]);
  }
}
