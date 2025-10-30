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
import { Dashboard } from './features/dashboard/dashboard';

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
      { path: '', component: Dashboard },
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes')
        .then(m => m.DASHBOARD_ROUTES)/*, canActivate: [authGuard]*/ },
    ],
  },
  // --- Wildcard ---
  { path: '**', redirectTo: '' }
];

// App routes
//import { UserRecoverPassword } from './features/recover-password/user-recover-password';

// Dashboard routes
//import { MetricsDashboard } from './features/dashboard/metrics-dashboard/metrics-dashboard';
//import { OrdersDashboard } from './features/dashboard/orders-dashboard/orders-dashboard';
//import { RolesDashboard } from './features/dashboard/roles-dashboard/roles-dashboard';
//import { UsersDashboard } from './features/dashboard/users-dashboard/users-dashboard';

// Otras rutas
//import { Unauthorized } from './features/unauthorized/unauthorized';
//import { Missing } from './features/missing/missing';
//import { Help } from './features/help/help';
//import { Contact } from './features/contact/contact';
//import { About } from './features/about/about';
//import { ShoppingDashboard } from './features/dashboard/shopping-dashboard/shopping-dashboard';
/* IMPORT RUTES IN THIS SPACE - TOP*/

// Define routes in the array below
// export const routes: Routes = [
    //{ path: 'about', component: About, pathMatch: 'full' },
    //{ path: 'contact', component: Contact, pathMatch: 'full' },
    // Other routes to pages
    //{ path: 'cart', component: CartList, pathMatch: 'full' },
    //{ path: 'help', component: Help, pathMatch: 'full' },
    /*{
        path: 'properties',
        loadChildren: () =>
        import('./features/properties/properties-list.route'),
    },
    {
        path: 'property',
        loadChildren: () =>
        import('./features/properties/properties-detail.route'),
    },
    { path: 'recover-password', component: UserRecoverPassword, pathMatch: 'full' },
    { path: 'signup', component: Signup, pathMatch: 'full' },
    {
        path: 'user',
        loadChildren: () =>
        import('./features/user/user.route'),
    },*/

    // Other routes to important pages
    //{ path: 'unauthorized', component: Unauthorized }, // not authorized page
    //{ path: '**', component: Missing }, // 404 not found page
//];
