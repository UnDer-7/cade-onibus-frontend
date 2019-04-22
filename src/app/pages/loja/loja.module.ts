import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { LojaComponent } from './loja.component';
import { UsersService } from '../../services/resources/users.service';

const routes: Routes = [
  {
    path: '',
    component: LojaComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule.forRoot()
  ],
  declarations: [LojaComponent],
  providers: [
    Keyboard,
    UsersService
  ],
})
export class LojaModule {}
