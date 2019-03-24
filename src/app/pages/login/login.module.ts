import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login.page';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';

const route: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(route),
    BlockUIModule.forRoot(),
  ],
  declarations: [
    LoginPage
  ]
})
export class LoginModule { }
