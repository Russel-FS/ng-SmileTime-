import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./admin-panel/admin-panel.component')
            .then(m => m.AdminPanelComponent)
    }
];
