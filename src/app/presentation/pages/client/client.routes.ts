import { Routes } from '@angular/router';
import { BookComponent } from './appointments/book/book.component';
import { HistoryComponent } from './appointments/history/history.component';
import { CalendarComponent } from './appointments/calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { ClientChatComponent } from './client-chat/client-chat.component';

export const clientRoutes: Routes = [
  {
    path: 'appointments',
    children: [
      { path: 'book', component: BookComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'calendar', component: CalendarComponent },
    ],
  },
  { path: 'medical-history', component: MedicalHistoryComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'chat', component: ClientChatComponent },
];
