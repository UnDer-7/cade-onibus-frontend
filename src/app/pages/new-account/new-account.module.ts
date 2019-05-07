import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { BlockUIModule } from 'ng-block-ui';
import { socialLoginConfig } from '../../config/social-login.config';
import { UserService } from '../../resource/user.service';
import { SharedComponentModule } from '../../shared/component/shared-component.module';
import { COMMON_IMPORTS } from '../../utils/common-imports';
import { NewAccountComponent } from './new-account.component';

@NgModule({
  imports: [
    COMMON_IMPORTS,
    SocialLoginModule,
    BlockUIModule.forRoot(),
    SharedComponentModule.forRoot(),
    RouterModule.forChild([{ path: '', component: NewAccountComponent }]),
  ],
  declarations: [
    NewAccountComponent,
  ],
  providers: [
    UserService,
    {
      provide: AuthServiceConfig,
      useFactory: socialLoginConfig,
    },
  ],
})
export class NewAccountModule { }
