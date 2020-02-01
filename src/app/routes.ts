import { Routes } from '@angular/router';
import { CanLogInGuard } from './guard/can-log-in.guard';
import { IsLoggedInGuard } from './guard/is-logged-in.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'forgot-password',
    loadChildren: './component/forgot-password/forgot-password.module#ForgotPasswordModule',
  },
  {
    path: 'login',
    loadChildren: './component/login/login.module#LoginModule',
    canActivate: [CanLogInGuard],
  },
  {
    path: 'new-account',
    loadChildren: './component/new-account/new-account.module#NewAccountModule',
    canActivate: [CanLogInGuard],
  },
  {
    path: 'app',
    loadChildren: './component/tabs/tabs.module#TabsPageModule',
    canActivate: [IsLoggedInGuard],
  },

  { path: '**', redirectTo: 'app' }, // If no matching route found go to Home
];
