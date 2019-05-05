import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { BlockUIModule } from 'ng-block-ui';
import { SessionHandler } from '../../auth/session.handler';
import { socialLoginConfig } from '../../config/social-login.config';
import { UserService } from '../../resource/user.service';
import { EmailPasswordComponent } from '../../shared/component/email-password/email-password.component';
import { COMMON_IMPORTS } from '../../utils/common-imports';
import { UtilService } from '../../utils/util.service';
import { NewAccountComponent } from './new-account.component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    SocialLoginModule,
    ReactiveFormsModule,
    BlockUIModule.forRoot(),
    RouterModule.forChild([{ path: '', component: NewAccountComponent }]),
  ],
  declarations: [
    NewAccountComponent,
    EmailPasswordComponent,
  ],
  providers: [
    UserService,
    UtilService,
    SessionHandler,
    {
      provide: AuthServiceConfig,
      useFactory: socialLoginConfig,
    },
  ],
})
export class NewAccountModule { }
