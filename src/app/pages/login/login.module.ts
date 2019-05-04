import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { BlockUIModule } from 'ng-block-ui';
import { SessionService } from '../../auth/session.service';
import { socialLoginConfig } from '../../config/social-login.config';
import { COMMON_IMPORTS } from '../../utils/common-imports';
import { UtilService } from '../../utils/util.service';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    SocialLoginModule,
    BlockUIModule.forRoot(),
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ],
  providers: [
    SessionService,
    UtilService,
    {
      provide: AuthServiceConfig,
      useFactory: socialLoginConfig,
    },
  ],
  declarations: [LoginComponent],
})
export class LoginModule { }
