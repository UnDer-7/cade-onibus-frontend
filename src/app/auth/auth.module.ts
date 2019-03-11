import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login/login.page';
import { NewAccountPage } from './new-account/new-account.page';
import { AuthService } from './auth.service';
import { authRoutes } from './auth.route';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(authRoutes)
  ],
  declarations: [
    LoginPage,
    NewAccountPage
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {
}
