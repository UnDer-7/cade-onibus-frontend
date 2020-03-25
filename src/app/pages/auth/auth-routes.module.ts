import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () => import('./singIn/sing-in.module').then((m) => m.SingInModule),
  },
  {
    path: 'recuperar-senha',
    loadChildren: () => import('./recoveryPassword/recovery-password.module').then((m) => m.RecoveryPasswordModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class AuthRoutesModule { }
