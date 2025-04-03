import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: []
    }
];
