import { Routes, PreloadAllModules } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';

export const dentistRoutes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./main/main.component').then(m => m.MainComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./dentist-home/dentist-home.component').then(m => m.DentistHomeComponent)
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'patients',
        loadComponent: () => import('./patients/patients.component').then(m => m.PatientsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'appointment-scheduling',
        loadComponent: () => import('./appointment-scheduling/appointment-scheduling.component').then(m => m.AppointmentSchedulingComponent)
      },
      {
        path: 'calendar',
        loadComponent: () => import('./calendar/calendar.component').then(m => m.CalendarComponent)
      },
      {
        path: 'chat',
        loadComponent: () => import('./dentist-chat/dentist-chat.component').then(m => m.DentistChatComponent)
      },
    ]
  },
  {
    path: 'calendar', component: CalendarComponent
  },
  { path: '**', redirectTo: 'main/home', pathMatch: 'full' },
];

export const routingConfiguration = {
  preloadingStrategy: PreloadAllModules
};
