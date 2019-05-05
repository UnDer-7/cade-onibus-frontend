import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SessionHandler } from '../../auth/session.handler';
import { ObjectToUser, SocialUserToUser, User } from '../../models/user.model';
import { UserService } from '../../resource/user.service';
import { UtilService } from '../../utils/util.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
})
export class NewAccountComponent implements OnInit {
  public contentColor: string = environment.contentColor;
  public user: User = {} as User;

  @BlockUI() private blockUi!: NgBlockUI;

  constructor(
    private socialService: AuthService,
    private userService: UserService,
    private utilService: UtilService,
    private sessionHandler: SessionHandler,
  ) {
  }

  public ngOnInit(): void {
  }

  public saveEmailPassword(): void {
    console.log('USER TO SAVE: ', this.user);
  }

  public async saveGoogle(): Promise<void> {
    this.blockUi.start();
    await this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(this.blockUi.stop);

    this.createGoogleUser();
  }

  private createGoogleUser(): void {
    this.socialService.authState.pipe(
      mergeMap(socialUser => {
        return this.userService.createUser(SocialUserToUser(socialUser))
          .pipe(
            finalize(() => this.blockUi.stop()),
          );
      }),
    ).subscribe(
      res => {
        this.sessionHandler.loginWithGoogle(res);
        this.utilService.showToast(`${res.name} cadastrado com sucesso`, 'success');
      },
      (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.utilService.showToast('Usuário já cadastrado', 'danger');
        }
      });
  }
}
