import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { DashboardPage } from './features/dashboard.page/dashboard.page';


export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPage },


            { path: 'facility' , loadChildren: () => import('./features/facility/facility.routes') },
            { path: 'staff' , loadChildren: () => import('./features/Staff/staff.route') },
            {path: 'patientManagement', loadChildren: () => import('./features/PatientManagement/patientManagement.route').then(m=>m.default)},

        ]
    }
];
