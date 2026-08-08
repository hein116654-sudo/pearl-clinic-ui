import { Routes } from '@angular/router';
import { AppLayout } from './layout/component/app.layout';
import { DashboardPage } from './features/dashboard.page/dashboard.page';
import { PractitionerPage } from './features/practitioner.page/practitioner.page';
import { PatientPage } from './features/patient.page/patient.page';
import { SpecializationPage } from './features/specialization.page/specialization.page';

export const routes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardPage },
            { path: 'patients', component: PatientPage },
            {path:'practitioners', component: PractitionerPage},
            {path:'specializations',component:SpecializationPage}
            
            

        ]
    }
];
