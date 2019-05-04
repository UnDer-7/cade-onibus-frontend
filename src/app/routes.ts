import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'home', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },

  { path: '**', redirectTo: 'home' }, // If no matching route found go to Home
];
