import { NgModule } from '@angular/core';
import { COMMON_IMPORTS } from '../../utils/common-imports';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SessionService } from '../../resource/session.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../resource/user.service';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ForgotPasswordComponent }]),
  ],
  declarations: [
    ForgotPasswordComponent,
  ],
  providers: [
    SessionService,
    UserService,
  ],
})
export class ForgotPasswordModule {}
