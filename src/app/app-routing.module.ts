import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const authModule = import('./pages/auth/auth.module').then((m) => m.AuthModule);

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => authModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
