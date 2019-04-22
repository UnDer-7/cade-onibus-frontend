import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoedasComponent } from './moedas.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: MoedasComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MoedasComponent]
})
export class MoedasModule { }
