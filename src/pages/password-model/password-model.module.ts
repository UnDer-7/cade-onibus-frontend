import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordModelPage } from './password-model';

@NgModule({
  declarations: [
    PasswordModelPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordModelPage),
  ],
})
export class PasswordModelPageModule {}
