import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit, NgZone, OnDestroy } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { Router } from '@angular/router';
import { Carrusel } from '../../../core/domain/model/heropagedata/carrusel';
import { CarouselService } from '../../../infrastructure/datasources/carousel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('carouselInner') carouselInner!: ElementRef;

  carouselItems: Carrusel[] = [];
  private subscription?: Subscription;

  currentIndex = 0;
  autoPlayInterval: any;
  isAutoPlaying = true;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private carouselService: CarouselService
  ) { }

  ngOnInit() {
    this.loadCarouselItems();
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadCarouselItems() {
    this.subscription = this.carouselService.getCarouselItems()
      .subscribe(items => {
        this.carouselItems = items;
      });
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
