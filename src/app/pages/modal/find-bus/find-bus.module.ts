import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FindBusPage } from './find-bus.page';
import { FindBusService } from './find-bus.service';

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
  ],
  declarations: [FindBusPage],
  providers: [
    FindBusService,
  ],
})
export class FindBusPageModule {}
