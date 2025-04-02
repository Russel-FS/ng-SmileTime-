import { Routes } from '@angular/router';
import { LayoutComponent } from './presentation/shared/layout/containers/layout/layout.component';
import { HomeComponent } from './presentation/pages/home/home.component';
import { AboutComponent } from './presentation/pages/about/about.component';
import { ContactComponent } from './presentation/pages/contact/contact.component';
import { clientRoutes } from './presentation/pages/client/client.routes';
import { dentistRoutes } from './presentation/pages/dentist/dentis.routes';
import { authRoutes } from './presentation/pages/auth/auth.routes';
import { SearchComponent } from './presentation/components/search/search.component';
import { adminRoutes } from './presentation/pages/admin/routes';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
    ],
  },
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: 'client',
    children: clientRoutes,
  },
  {
    path: 'dentist',
    children: dentistRoutes,
  },
  {
    path: 'admin',
    children: adminRoutes,
  },
];
