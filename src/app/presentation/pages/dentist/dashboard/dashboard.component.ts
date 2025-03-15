import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { AuthService } from '../../../../infrastructure/datasources/auth.service';
import { DashboardService } from '../../../../infrastructure/datasources/dashboard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { DataEntity } from '../../../../core/domain/model/dashboard/data-entity';
import { CiteEntity } from '../../../../core/domain/model/dashboard/cite-entity';
import { PacientEntity } from '../../../../core/domain/model/dashboard/pacient-entity';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent implements OnInit, OnDestroy {
  public dashboardData: DataEntity | null = null;
  public appointments: CiteEntity[] = [];
  public patients: PacientEntity[] = [];
  private appointmentsChart: Chart | null = null;
  private treatmentsChart: Chart | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadDashboardData();
      this.loadAppointments();
      this.loadPatients();
    }
  }

  private loadDashboardData() {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
      this.initializeAppointmentsChart();
      this.initializeTreatmentsChart();
    });
  }

  private loadAppointments() {
    this.dashboardService.getAppointments().subscribe(appointments => {
      this.appointments = appointments;
    });
  }

  private loadPatients() {
    this.dashboardService.getPatients().subscribe(patients => {
      this.patients = patients;
    });
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
      this.dashboardService.getMonthlyAppointments().subscribe(monthlyData => {
        const labels = Array.from(monthlyData.keys());
        const data = Array.from(monthlyData.values());

        this.appointmentsChart = new Chart(canvas, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Citas por Mes',
              data: data,
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
      this.dashboardService.getTreatmentStats().subscribe(treatments => {
        this.treatmentsChart = new Chart(canvas, {
          type: 'doughnut',
          data: {
            labels: ['Limpiezas', 'Extracciones', 'Empastes'],
            datasets: [{
              data: [treatments.cleanings, treatments.extractions, treatments.fillings],
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
      });
    } catch (error) {
      console.error('Error initializing treatments chart:', error);
    }
  }
}
