import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MapsPage } from './maps.page';
import { AgmCoreModule } from '@agm/core';
import { MapsService } from './maps.service';

const routes: Routes = [
  {
    path: '',
    component: MapsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCuj1bd6vb0mHGIfvEoyj1_SgKk8HfWdVs'
    })
  ],
  declarations: [MapsPage],
  providers: [
    MapsService
  ]
})
export class MapsPageModule {}
