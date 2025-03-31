import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';
import { ProfileComponent } from './profile/profile.component';
import { DentistChatComponent } from './dentist-chat/dentist-chat.component';
import { AppointmentSchedulingComponent } from './appointment-scheduling/appointment-scheduling.component';

export const dentistRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'appointment-scheduling', component: AppointmentSchedulingComponent },
  { path: 'chat', component: DentistChatComponent },
];
