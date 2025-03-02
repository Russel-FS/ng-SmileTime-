import { Routes } from '@angular/router';
import { LayoutComponent } from './presentation/shared/layout/containers/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [],
  },
];
