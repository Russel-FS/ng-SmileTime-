import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeComponent } from '../home/home.component';
import { CarouselManagementComponent } from './carousel-management/carousel-management.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'home', component: HomeComponent,
            },
            {
                path: 'dentistas', component: AdminPanelComponent,
            }
            , {
                path: 'carruseles', component: CarouselManagementComponent,
            }
        ]
    }
    , {
        path: '**',
        redirectTo: 'home', pathMatch: 'full'
    }
];
