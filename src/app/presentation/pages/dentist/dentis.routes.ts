import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { ProfileComponent } from './profile/profile.component';
import { DentistChatComponent } from './dentist-chat/dentist-chat.component';
import { AppointmentSchedulingComponent } from './appointment-scheduling/appointment-scheduling.component';
import { CalendarComponent } from './calendar/calendar.component';

export const dentistRoutes: Routes = [
  {
    path: 'main', loadComponent: () => import('./main/main.component').then(m => m.MainComponent),
    children: [
      { path: 'home', loadComponent: () => import('./dentist-home/dentist-home.component').then(m => m.DentistHomeComponent), },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'appointment-scheduling', component: AppointmentSchedulingComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'chat', component: DentistChatComponent },
    ]
  },
  { path: 'calendar', component: CalendarComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
