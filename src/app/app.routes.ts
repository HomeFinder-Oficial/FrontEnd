import { Routes } from '@angular/router';
// Guards
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
// Components
import { PublicLayout } from './layouts/public-layout/public-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
// Pages
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Home } from './features/home/home';

/* IMPORT RUTES IN THIS SPACE - DOWN */
// Default route
export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
        { path: '', component: Home },
        { path: 'home', redirectTo: '', pathMatch: 'full' },
        { path: 'login', component: Login, canActivate: [publicGuard] },
        { path: 'register', component: Register, canActivate: [publicGuard] },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: '', component: DashboardLayout },
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes')
        .then(m => m.DASHBOARD_ROUTES)/*, canActivate: [authGuard]*/ },
    ],
  },
  // --- Wildcard ---
  { path: '**', redirectTo: '' }
];
