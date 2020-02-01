import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilPage } from './perfil.page';
import { UserService } from '../modals/user-form/user.service';
import { SharedModule } from '../../shared/shared.module';
import { PerfilService } from './perfil.service';

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
  ],
  declarations: [PerfilPage],
  providers: [
    PerfilService
  ]
})
export class PerfilPageModule {}
