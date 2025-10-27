import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard';
import { PropertiesDashboard } from './properties-dashboard/properties-dashboard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';
//import { AdminGuard } from '../../core/services/admin.guard';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', title: 'Dashboard component', component: Dashboard,
    children: [
      /*{
          path: 'categories', // child route path
          component: CategoriesDashboard, // another child route component that the router renders
      },*/
      {
          path: 'admin', // child route path
          component: AdminDashboard, // another child route component that the router renders
      },
      {
          path: 'properties', // child route path
          component: PropertiesDashboard, // child route component that the router renders
      }/*,
      {
          path: 'orders', // child route path
          component: OrdersDashboard, // child route component that the router renders
      },
      {
          path: 'roles', // child route path
          component: RolesDashboard, // child route component that the router renders
      },
      {
          path: 'shopping', // child route path
          component: ShoppingDashboard, // child route component that the router renders
      },
      {
          path: 'users', // child route path
          component: UsersDashboard, // child route component that the router renders
      }*/
    ], // canActivate: [AdminGuard]
  }
];
