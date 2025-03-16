import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MockDashboardService } from '../../../../infrastructure/datasources/mock/mock-dashboard.service';
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
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  public dashboardData: DataEntity | null = null;
  public appointments: CiteEntity[] = [];
  public patients: PacientEntity[] = [];
  private appointmentsChart: Chart | null = null;
  private treatmentsChart: Chart | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dashboardService: MockDashboardService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAppointments();
      this.loadPatients();
      this.loadDashboardData();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeCharts();
        this.cdr.detectChanges();
      }, 0);
    }
  }

  private loadDashboardData() {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
      this.initializeCharts();
      this.cdr.detectChanges();
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

  private initializeCharts() {
    this.initializeAppointmentsChart();
    this.initializeTreatmentsChart();
  }

  private initializeAppointmentsChart() {
    const canvas = document.getElementById('appointmentsChart') as HTMLCanvasElement | null;
    if (!canvas) {
      console.error('Canvas element not found for appointments chart');
      return;
    }

    try {
      if (this.appointmentsChart) {
        this.appointmentsChart.destroy();
      }

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
      if (this.treatmentsChart) {
        this.treatmentsChart.destroy();
      }

      if (this.dashboardData && this.dashboardData.treatments) {
        const treatments = this.dashboardData.treatments;
        const total = treatments.cleanings + treatments.extractions + treatments.fillings;

        this.treatmentsChart = new Chart(canvas, {
          type: 'doughnut',
          data: {
            labels: ['Limpiezas', 'Extracciones', 'Empastes'],
            datasets: [{
              data: [treatments.cleanings, treatments.extractions, treatments.fillings],
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(234, 179, 8, 0.8)'
              ],
              borderColor: [
                'rgb(59, 130, 246)',
                'rgb(34, 197, 94)',
                'rgb(234, 179, 8)'
              ],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  usePointStyle: true,
                  padding: 20
                }
              }
            }
          }
        });
      }
    } catch (error) {
      console.error('Error initializing treatments chart:', error);
    }
  }
}
