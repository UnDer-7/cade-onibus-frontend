import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { finalize, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { SessionService } from '../../auth/session.service';
import { User } from '../../models/user.model';
import { UtilService } from '../../utils/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public contentColor: string = environment.contentColor;

  @BlockUI() private blockUi!: NgBlockUI;

  constructor(
    private socialService: AuthService,
    private sessionService: SessionService,
    private utilService: UtilService,
  ) {
  }

  public ngOnInit(): void {
  }

  public async google(): Promise<void> {
    this.blockUi.start();
    await this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID).catch(this.blockUi.stop);

    // this.socialService.authState.subscribe(
    //   res => {
    //     this.sessionService.loginWithGoogle(this.socialUserToUser(res)).pipe(
    //       finalize(() => this.blockUi.stop()),
    //     ).subscribe();
    //   },
    //   err => {
    //     this.blockUi.stop();
    //   },
    // );

    this.socialService.authState.pipe(
      mergeMap(socialUser => {
        return this.sessionService.loginWithGoogle(this.socialUserToUser(socialUser))
          .pipe(
            finalize(() => this.blockUi.stop()),
          );
      }),
    ).subscribe(
      res => {
      console.log('RES: ', res);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 404 || err.status === 400) {
          this.utilService.showToast('Usuário não encontrado', 'danger');
        }
      },
    );
  }

  public emailPassword(): void {
    this.loginWithEmailPassword();
  }

  private loginWithGoogle(user: User): void {

  }

  private loginWithEmailPassword(): void {
  }

  private socialUserToUser(socialUser: SocialUser): User {
    return Object.assign({}, {
      google_id: socialUser.id,
      name: socialUser.name,
      email: socialUser.email,
    });
  }
}
