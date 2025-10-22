import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard';
//import { AdminGuard } from '../../core/services/admin.guard';

const routes: Routes = [
  { path: 'dashboard', component: Dashboard/*, canActivate: [AdminGuard]*/ },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
