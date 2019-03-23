import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserFormComponent } from './user-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './user.service';

const routes: Routes = [
  {
    path: '',
    component: UserFormComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    UserFormComponent
  ],
  providers: [
    UserService
  ]
})
export class UserFormModule { }
