import { Component } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize } from 'rxjs/operators';
import { SessionHandler } from '../../auth/session.handler';
import { SocialUserToUser, User } from '../../model/user.model';
import { UtilService } from '../../utils/util.service';
import { ComponentsUtils } from '../../utils/components-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends ComponentsUtils {

  public isEmailPassword: boolean = false;

  @BlockUI() private blockUi!: NgBlockUI;

  constructor(
    private socialService: AuthService,
    private utilService: UtilService,
    private sessionHandler: SessionHandler,
  ) { super(); }

  public async google(): Promise<void> {
    this.blockUi.start();
    await this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(this.blockUi.stop);
    this.loginWithGoogle();
  }

  public email(user: User): void {
    this.blockUi.start();
    this.sessionHandler.loginWithEmail(user);
  }

  public onEmailSelection(): void {
    this.isEmailPassword = true;
  }

  private loginWithGoogle(): void {
    this.socialService.authState.pipe(
      finalize(() => this.blockUi.stop()),
    ).subscribe(res => {
      this.sessionHandler.loginWithGoogle(SocialUserToUser(res));
    });
  }
}
