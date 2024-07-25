import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeliveriesComponent } from './components/deliveries/deliveries.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'deliveries', component: DeliveriesComponent }
];
