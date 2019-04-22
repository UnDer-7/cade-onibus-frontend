import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.guard';
import { LoginGuard } from './guards/login-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule',
    canActivate: [ LoginGuard ]
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'perfil',
    loadChildren: './pages/perfil/perfil.module#PerfilPageModule',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'loja',
    loadChildren: './pages/loja/loja.module#LojaModule',
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
