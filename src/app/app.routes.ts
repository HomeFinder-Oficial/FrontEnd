import { Routes } from '@angular/router';
// Guards
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';
// Pages
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { HomeComponent } from './features/home/home.component';
import { Dashboard } from './features/dashboard/dashboard';
// Components
import { MainLayout } from './shared/components/main-layout/main-layout';

/* IMPORT RUTES IN THIS SPACE - DOWN */
// Default route
export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [publicGuard] },
  { path: 'register', component: Register, canActivate: [publicGuard] },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      //{ path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.routes')
      //  .then(m => m.DASHBOARD_ROUTES),},
    ],
  },
  { path: 'dashboard', component: Dashboard}
];

// App routes
//import { Signup } from './features/signup/signup';
//import { Login } from './features/login/login';
//import { UserRecoverPassword } from './features/recover-password/user-recover-password';

// Protected routes
//import { NormalGuard } from './core/services/normal.guard.service';
//import { AuthGuard } from './core/services/auth.guard.service';

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
    //{ path: '', component: Home, pathMatch: 'full' }, // By default, go to Home
    //{ path: 'home', redirectTo: '', component: Home, pathMatch: 'full' }, // Redirect /home to /

    //{ path: 'about', component: About, pathMatch: 'full' },
    //{ path: 'contact', component: Contact, pathMatch: 'full' },
    /*{ path: 'dashboard', title: 'Dashboard component', component: Dashboard,
        children: [
        {
            path: 'categories', // child route path
            component: CategoriesDashboard, // another child route component that the router renders
        },
        {
            path: 'metrics', // child route path
            component: MetricsDashboard, // another child route component that the router renders
        },
        {
            path: 'properties', // child route path
            component: PropertiesDashboard, // child route component that the router renders
        },
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
        }
        ], canActivate: [AdminGuard]
    },*/
    // Other routes to pages
    //{ path: 'cart', component: CartList, pathMatch: 'full' },
    //{ path: 'help', component: Help, pathMatch: 'full' },
    //{ path: 'login', component: Login, pathMatch: 'full' },
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
