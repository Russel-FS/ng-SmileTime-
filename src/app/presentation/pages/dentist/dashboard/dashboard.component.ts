import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from '../../../../infrastructure/datasources/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent implements OnInit, OnDestroy {
  public numero: number = 5456465;
  private appointmentsChart: Chart | null = null;
  private treatmentsChart: Chart | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAppointmentsChart();
      this.initializeTreatmentsChart();
    }
  }

  ngOnDestroy() {
    if (this.appointmentsChart) {
      this.appointmentsChart.destroy();
    }
    if (this.treatmentsChart) {
      this.treatmentsChart.destroy();
    }
  }

  private initializeAppointmentsChart() {
    const canvas = document.getElementById('appointmentsChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Canvas element not found for appointments chart');
      return;
    }

    try {
      this.appointmentsChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [{
            label: 'Citas por Mes',
            data: [60, 75, 45, 90, 65, 80],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } catch (error) {
      console.error('Error initializing appointments chart:', error);
    }
  }

  private initializeTreatmentsChart() {
    const canvas = document.getElementById('treatmentsChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Canvas element not found for treatments chart');
      return;
    }

    try {
      this.treatmentsChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: ['Limpiezas', 'Extracciones', 'Empastes'],
          datasets: [{
            data: [40, 35, 25],
            backgroundColor: [
              'rgba(59, 130, 246, 0.2)',
              'rgba(34, 197, 94, 0.2)',
              'rgba(234, 179, 8, 0.2)'
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(34, 197, 94)',
              'rgb(234, 179, 8)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    } catch (error) {
      console.error('Error initializing treatments chart:', error);
    }
  }
}
