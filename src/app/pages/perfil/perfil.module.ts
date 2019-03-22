import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { PerfilService } from './perfil.service';
import { SharedModule } from '../../shared/shared.module';
import { AuthModule } from '../../auth/auth.module';

const routes: Routes = [
  {
    path: '',
    component: PerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule.forRoot(),
    AuthModule.forRoot()
  ],
  declarations: [PerfilPage],
  providers: [
    PerfilService
  ]
})
export class PerfilPageModule {}
