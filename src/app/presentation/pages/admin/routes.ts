import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'home', component: AdminHomeComponent
            },
            {
                path: 'dentistas', component: AdminPanelComponent,
            }
        ]
    }
    , {
        path: '**',
        redirectTo: 'home', pathMatch: 'full'
    }
];
