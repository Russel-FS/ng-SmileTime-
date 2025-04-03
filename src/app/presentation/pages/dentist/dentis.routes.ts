import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DentistHomeComponent } from './dentist-home/dentist-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { ProfileComponent } from './profile/profile.component';
import { AppointmentSchedulingComponent } from './appointment-scheduling/appointment-scheduling.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DentistChatComponent } from './dentist-chat/dentist-chat.component';

export const dentistRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'home', component: DentistHomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'appointment-scheduling', component: AppointmentSchedulingComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'chat', component: DentistChatComponent },
    ]
  },
  { path: 'calendar', component: CalendarComponent },
  { path: '**', redirectTo: 'main/home', pathMatch: 'full' },
];


