import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecoveryPasswordComponent } from './recovery-password.component';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: RecoveryPasswordComponent }]),
  ],
  declarations: [
    RecoveryPasswordComponent,
  ]
})
export class RecoveryPasswordModule { }
