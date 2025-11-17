import { Routes } from '@angular/router';
// Guards
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
// Components
import { PublicLayout } from './layouts/public-layout/public-layout';
import { DashboardLayout } from './layouts/dashboard-layout/dashboard-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
// Pages
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Home } from './features/home/home';
import { Properties } from './features/properties/properties';

/* IMPORT RUTES IN THIS SPACE - DOWN */
// Default route
export const routes: Routes = [
  {
    path: '',
    component: PublicLayout,
    children: [
        { path: '', component: Home, canActivate: [publicGuard] },
        { path: 'home', redirectTo: '', pathMatch: 'full' },
        { path: 'properties', redirectTo: '/dashboard/properties', pathMatch: 'full' }
    ],
  },
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', component: AuthLayout/*, canActivate: [authGuard]*/ },
      { path: 'login', component: Login, canActivate: [publicGuard] },
      { path: 'register', component: Register, canActivate: [publicGuard] }
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayout,
    children: [
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: 'properties', component: Properties },
      { path: '', loadChildren: () => import('./features/dashboard/dashboard.routes')
        .then(m => m.DASHBOARD_ROUTES)/*, canActivate: [authGuard]*/ }
    ],
  },
  // --- Wildcard ---
  { path: '**', redirectTo: '' }
];
