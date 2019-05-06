import { Routes } from '@angular/router';
import { CanLogInGuard } from './guard/can-log-in.guard';
import { IsLoggedInGuard } from './guard/is-logged-in.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule',
    canActivate: [CanLogInGuard],
  },
  {
    path: 'new-account',
    loadChildren: './pages/new-account/new-account.module#NewAccountModule',
    canActivate: [CanLogInGuard],
  },
  {
    path: 'app',
    loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canActivate: [IsLoggedInGuard],
  },

  { path: '**', redirectTo: 'app' }, // If no matching route found go to Home
];
