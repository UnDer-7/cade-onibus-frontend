import { NgModule } from '@angular/core';
import { COMMON_IMPORTS } from '../../utils/common-imports';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SessionService } from '../../resource/session.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../resource/user.service';
import { BlockUIModule } from 'ng-block-ui';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ForgotPasswordComponent }]),
    BlockUIModule.forRoot(),
  ],
  declarations: [
    ForgotPasswordComponent,
  ],
  providers: [
    SessionService,
    UserService,
    UserService,
  ],
})
export class ForgotPasswordModule {}
