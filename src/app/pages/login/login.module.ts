import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { BlockUIModule } from 'ng-block-ui';
import { socialLoginConfig } from '../../config/social-login.config';
import { SharedComponentModule } from '../../shared/component/shared-component.module';
import { COMMON_IMPORTS } from '../../utils/common-imports';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    SocialLoginModule,
    BlockUIModule.forRoot(),
    SharedComponentModule.forRoot(),
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: socialLoginConfig,
    },
  ],
  declarations: [LoginComponent],
})
export class LoginModule { }
