import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FindBusPage } from './find-bus.page';
import { FindBusService } from './find-bus.service';
import { SharedModule } from '../../../shared/shared.module';
import { Keyboard } from '@ionic-native/keyboard/ngx';

const routes: Routes = [
  {
    path: '',
    component: FindBusPage
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
  declarations: [FindBusPage],
  providers: [
    FindBusService,
    Keyboard
  ],
})
export class FindBusPageModule {}
